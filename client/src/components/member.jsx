import React, { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "../lib/authContext";
import { supabase } from "../lib/supabase";

const TOTAL_SEATS = 100;
const EVENT_ID = "2026-04-15-live-call";
const MIN_MS_BETWEEN_RESERVE_ATTEMPTS = 3500;
const MAX_SEAT_COLLISION_RETRIES = 8;

function pickNextSeatNumber(bookedNumbers) {
  const taken = new Set(bookedNumbers);
  for (let n = 1; n <= TOTAL_SEATS; n++) {
    if (!taken.has(n)) return n;
  }
  return null;
}

/** Visual urgency tier for remaining seats (not boring grey). */
function seatAvailabilityTier(remaining, total) {
  if (total <= 0 || remaining <= 0) return "soldout";
  const ratio = remaining / total;
  if (ratio > 0.5) return "plenty";
  if (ratio > 0.25) return "good";
  if (ratio > 0.1) return "low";
  return "critical";
}

async function fetchBookedSeatNumbers() {
  const { data, error } = await supabase
    .from("seat_reservations")
    .select("seat_number")
    .eq("event_id", EVENT_ID);

  if (error) {
    console.error("Failed to load seats:", error);
    return null;
  }
  return (data || []).map((r) => r.seat_number).filter(Number.isFinite);
}

async function fetchMyReservationSeat(userId) {
  const { data, error } = await supabase
    .from("seat_reservations")
    .select("seat_number")
    .eq("event_id", EVENT_ID)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Failed to check existing reservation:", error);
    return null;
  }
  return data?.seat_number ?? null;
}

const SeatOneClick = ({
  remaining,
  user,
  authLoading,
  isBooking,
  rateHint,
  onReserveClick,
}) => {
  const tier = seatAvailabilityTier(remaining, TOTAL_SEATS);
  const soldOut = remaining <= 0;

  const handlePrimaryClick = () => {
    if (soldOut || isBooking || authLoading) return;
    if (!user) {
      window.location.href = "/auth";
      return;
    }
    onReserveClick();
  };

  let buttonLabel = "Reserve my seat";
  if (soldOut) {
    buttonLabel = "Sold out";
  } else if (authLoading) {
    buttonLabel = "Checking session…";
  } else if (!user) {
    buttonLabel = "Log in to reserve your seat";
  } else if (isBooking) {
    buttonLabel = "Saving your spot…";
  }

  const disabled = soldOut || isBooking || authLoading;

  return (
    <div className="seat-selector" id="seat-selector">
      <p className="seat-selector__meta">
        <span className="seat-selector__meta-label">Launch Meeting April 15th, 2026</span>
        <span
          className="seat-counter-badge"
          data-tier={tier}
          role="status"
          aria-live="polite"
        >
          <span className="seat-counter-badge__value">{Math.max(0, remaining)}</span>
          <span className="seat-counter-badge__suffix"> / {TOTAL_SEATS} seats left</span>
        </span>
      </p>

      {rateHint ? (
        <p className="seat-rate-hint" role="status">
          {rateHint}
        </p>
      ) : null}

      <button
        type="button"
        className="seat-cta"
        disabled={disabled}
        onClick={handlePrimaryClick}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

const Member = () => {
  const { user, loading: authLoading } = useAuth();

  const [bookedSeats, setBookedSeats] = useState([]);
  const [reservedSeat, setReservedSeat] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [rateHint, setRateHint] = useState("");

  const lastAttemptEndedAt = useRef(0);

  const loadBookedSeats = useCallback(async () => {
    const nums = await fetchBookedSeatNumbers();
    if (nums) setBookedSeats(nums);
  }, []);

  useEffect(() => {
    loadBookedSeats();

    const channel = supabase
      .channel(`seat_reservations:${EVENT_ID}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "seat_reservations" },
        (payload) => {
          const row = payload.new && Object.keys(payload.new).length ? payload.new : payload.old;
          if (row?.event_id === EVENT_ID) loadBookedSeats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadBookedSeats]);

  useEffect(() => {
    if (!user) {
      setReservedSeat(null);
      return;
    }

    (async () => {
      const existing = await fetchMyReservationSeat(user.id);
      if (existing != null) setReservedSeat(existing);
    })();
  }, [user]);

  const remaining = Math.max(0, TOTAL_SEATS - bookedSeats.length);

  const handleReserveClick = async () => {
    setRateHint("");

    if (authLoading) return;
    if (!user) {
      window.location.href = "/auth";
      return;
    }

    const now = Date.now();
    if (now - lastAttemptEndedAt.current < MIN_MS_BETWEEN_RESERVE_ATTEMPTS) {
      setRateHint("Please wait a few seconds before trying again.");
      return;
    }

    if (isBooking) return;

    setIsBooking(true);
    try {
      const already = await fetchMyReservationSeat(user.id);
      if (already != null) {
        setReservedSeat(already);
        return;
      }

      let booked = await fetchBookedSeatNumbers();
      if (!booked) {
        setRateHint("Could not load availability. Try again shortly.");
        return;
      }

      let nextSeat = pickNextSeatNumber(booked);
      if (nextSeat == null) {
        setRateHint("All seats are taken.");
        await loadBookedSeats();
        return;
      }

      for (let attempt = 0; attempt < MAX_SEAT_COLLISION_RETRIES; attempt++) {
        const { error } = await supabase.from("seat_reservations").insert({
          event_id: EVENT_ID,
          seat_number: nextSeat,
          user_id: user.id,
        });

        if (!error) {
          setReservedSeat(nextSeat);
          setBookedSeats((prev) =>
            [...new Set([...prev, nextSeat])].sort((a, b) => a - b)
          );
          return;
        }

        if (error.code === "23505") {
          const mine = await fetchMyReservationSeat(user.id);
          if (mine != null) {
            setReservedSeat(mine);
            return;
          }
          booked = await fetchBookedSeatNumbers();
          if (!booked) break;
          nextSeat = pickNextSeatNumber(booked);
          if (nextSeat == null) {
            setRateHint("All seats are taken.");
            await loadBookedSeats();
            return;
          }
          continue;
        }

        console.error("Failed to reserve seat:", error);
        alert(error.message || "Could not complete reservation.");
        await loadBookedSeats();
        return;
      }

      setRateHint("Could not assign a seat (high demand). Try again in a moment.");
      await loadBookedSeats();
    } finally {
      lastAttemptEndedAt.current = Date.now();
      setIsBooking(false);
    }
  };

  return (
    <div className="membership-wrapper">
      <section className="membership-card">
        <h2 className="membership-card__title">Reserve your seat</h2>

        <div className="membership-divider" />

        {reservedSeat != null ? (
          <div className="seat-confirmation">
            <h3 className="seat-confirmation__title">You&apos;re in</h3>
            <p className="seat-confirmation__text">
              Your spot is saved for the April 15th, 2026 launch meeting. We&apos;ll remind you before
              it starts.
            </p>
          </div>
        ) : (
          <SeatOneClick
            remaining={remaining}
            user={user}
            authLoading={authLoading}
            isBooking={isBooking}
            rateHint={rateHint}
            onReserveClick={handleReserveClick}
          />
        )}
      </section>
    </div>
  );
};

export default Member;
