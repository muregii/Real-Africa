import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/authContext";
import {
  Palette, Music, DollarSign, Sparkles, Monitor,
  Carrot, Trophy, BookOpen, Heart, Search
} from "lucide-react";

const LAUNCH_DATE = new Date("2026-04-15T00:00:00").getTime();

function useCountdown() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, LAUNCH_DATE - Date.now());
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return countdown;
}

const CATEGORIES = [
  { label: "All", icon: null },
  { label: "Hobbies", icon: Palette, color: "#8b5cf6" },
  { label: "Music", icon: Music, color: "#ec4899" },
  { label: "Money", icon: DollarSign, color: "#f59e0b" },
  { label: "Spirituality", icon: Sparkles, color: "#6366f1" },
  { label: "Tech", icon: Monitor, color: "#3b82f6" },
  { label: "Health", icon: Carrot, color: "#22c55e" },
  { label: "Sports", icon: Trophy, color: "#f97316" },
  { label: "Self-improvement", icon: BookOpen, color: "#0ea5e9" },
  { label: "Relationships", icon: Heart, color: "#ef4444" },
];

export default function Communities() {
    const countdown = useCountdown();
    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showWaitlist, setShowWaitlist] = useState(false);
    const [waitlistForm, setWaitlistForm] = useState({ name: "", email: "", country: "", community_idea: "" });
    const [waitlistLoading, setWaitlistLoading] = useState(false);
    const [waitlistSuccess, setWaitlistSuccess] = useState(false);
    const [waitlistError, setWaitlistError] = useState("");
    const { user, profile } = useAuth();
    const formatMembers = (count) => {
      const n = Number(count);
      return Number.isFinite(n) && n >= 0 ? n.toLocaleString() : "0";
    };
    const navigate = useNavigate();

    const handleWaitlistSubmit = async () => {
      setWaitlistError("");
      if (!waitlistForm.name || !waitlistForm.email || !waitlistForm.country) {
        setWaitlistError("Name, email, and country are required.");
        return;
      }
      setWaitlistLoading(true);
      const { error: insertError } = await supabase
        .from("community_waitlist_requests")
        .insert({
          full_name: waitlistForm.name,
          email: waitlistForm.email,
          country: waitlistForm.country,
          community_idea: waitlistForm.community_idea || null,
          user_id: user?.id || null,
        });
      if (insertError) {
        console.error("Waitlist insert error:", insertError);
        setWaitlistError("Something went wrong. Please try again.");
      } else {
        setWaitlistSuccess(true);
      }
      setWaitlistLoading(false);
    };

    useEffect(() => {
      let mounted = true;
      const loadCommunities = async () => {
        try {
          setLoading(true);
          const { data, error: fetchError } = await supabase
            .from("communities")
            .select("*, community_memberships(count)")
            .order("created_at", { ascending: true });

          if (fetchError) throw fetchError;

          const withCounts = (data || []).map((c) => {
            const liveCount = c.community_memberships?.[0]?.count;
            return {
              ...c,
              members_count:
                typeof liveCount === "number" ? liveCount : c.members_count ?? 0,
            };
          });

          if (mounted) setCommunities(withCounts);
        } catch (err) {
          console.error("Failed to load communities:", err);
          if (mounted) setError("Unable to load communities right now.");
        } finally {
          if (mounted) setLoading(false);
        }
      };

      loadCommunities();
      return () => { mounted = false; };
    }, []);
    return (
      <div className="discover-page">
        {/* Hero */}
        <section className="discover-hero">
          <h1>Find Your People</h1>
          <p className="hero-subtitle">
            Join communities of creators, builders, and thinkers across Africa. Learn together, grow together.
          </p>

          <div className="discover-countdown">
            <span className="discover-countdown__label">Communities launch in</span>
            <div className="discover-countdown__boxes">
              {[
                { value: countdown.days, label: "Days" },
                { value: countdown.hours, label: "Hrs" },
                { value: countdown.minutes, label: "Min" },
                { value: countdown.seconds, label: "Sec" },
              ].map((u) => (
                <div key={u.label} className="discover-countdown__box">
                  <span className="discover-countdown__num">{String(u.value).padStart(2, "0")}</span>
                  <span className="discover-countdown__unit">{u.label}</span>
                </div>
              ))}
            </div>
            <span className="discover-countdown__date">April 15, 2026</span>
          </div>

          <div className="search-wrapper">
            <Search size={18} strokeWidth={2} style={{ color: "#9ca3af", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search for anything"
            />
          </div>
        </section>
  
        {/* Categories */}
        <section className="categories">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.label}
                className={`pill ${i === 0 ? "active" : ""}`}
              >
                {Icon && <Icon size={15} strokeWidth={2.2} style={{ color: cat.color }} />}
                {cat.label}
              </button>
            );
          })}
        </section>
  
        {/* Grid */}
        <section className="grid-wrap">
          {error && (
            <p style={{ textAlign: "center", color: "#b91c1c" }}>
              {error}
            </p>
          )}
          {!loading && !error && communities.length === 0 && (
            <p style={{ textAlign: "center", color: "#64748b" }}>
              No communities found yet. If you just added them, confirm your
              Supabase RLS policy allows public reads on <strong>communities</strong>.
            </p>
          )}
          <div className="community-grid">
            {loading
              ? [0, 1, 2, 3, 4, 5].map((item) => (
                  <div key={`community-skeleton-${item}`} className="community-card community-card-skeleton" aria-hidden="true">
                    <div className="community-skeleton community-skeleton-image" />
                    <div className="card-body">
                      <div className="community-skeleton community-skeleton-title" />
                      <div className="community-skeleton community-skeleton-line" />
                      <div className="community-skeleton community-skeleton-line short" />
                      <div className="community-skeleton community-skeleton-button" />
                      <div className="community-skeleton community-skeleton-meta" />
                    </div>
                  </div>
                ))
              : communities.map((community) => {
                  const isComingSoon =
                    Boolean(community.is_coming_soon) ||
                    community.is_active === false;
                  return (
                    <div
                      key={community.id}
                      className={`community-card ${isComingSoon ? "community-card--soon" : ""}`}
                      onClick={() => {
                        if (community.slug && !isComingSoon) {
                          navigate(`/communities/${community.slug}`);
                        }
                      }}
                    >
                      <div className="card-image">
                        <img
                          src={community.image_url || "/assets/entrepreneurship.jpg"}
                          alt="Community cover"
                          className="card-img"
                        />
                      </div>

                      <div className="card-body">
                        <h3>{community.name}</h3>
                        <p>
                          {community.description || "A community built to learn, discuss, and grow together with like-minded people."}
                        </p>
                        {isComingSoon ? (
                          <span className="community-soon">Coming soon</span>
                        ) : (
                          <button
                            className="join-community-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/communities/${community.slug}`);
                            }}
                          >
                            Learn more
                          </button>
                        )}
                        <div className="card-meta">
                          <span>{formatMembers(community.members_count)} Members</span>
                          <span>•</span>
                          <strong>{community.price || "Free"}</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </section>
        <section className="community-waitlist">
          <h2>Want your own community?</h2>
          <p>Request access to launch a community with The Real Africa.</p>
          <button
            className="community-waitlist-btn"
            onClick={() => {
              setShowWaitlist(true);
              setWaitlistSuccess(false);
              setWaitlistError("");
              if (user && profile) {
                setWaitlistForm((f) => ({
                  ...f,
                  name: profile.full_name || "",
                  email: user.email || "",
                }));
              }
            }}
          >
            Request to join the waitlist
          </button>
        </section>

        {showWaitlist && (
          <div className="waitlist-overlay" onClick={() => setShowWaitlist(false)}>
            <div className="waitlist-dialog" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="waitlist-close-btn"
                onClick={() => setShowWaitlist(false)}
                aria-label="Close waitlist form"
              >
                ×
              </button>
              {waitlistSuccess ? (
                <>
                  <h3>You're on the list!</h3>
                  <p style={{ margin: "16px 0", fontSize: 14, color: "#4b5563" }}>
                    We'll reach out when spots open. Thank you for your interest.
                  </p>
                  <button className="waitlist-submit-btn" onClick={() => setShowWaitlist(false)}>
                    Close
                  </button>
                </>
              ) : (
                <>
                  <h3>Join the Waitlist</h3>
                  <p style={{ margin: "8px 0 20px", fontSize: 14, color: "#6b7280" }}>
                    Tell us about the community you'd like to create.
                  </p>
                  {waitlistError && (
                    <p style={{ color: "#b91c1c", fontSize: 13, marginBottom: 12 }}>{waitlistError}</p>
                  )}
                  <input
                    className="waitlist-input"
                    placeholder="Your full name"
                    value={waitlistForm.name}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, name: e.target.value })}
                  />
                  <input
                    className="waitlist-input"
                    placeholder="Email address"
                    type="email"
                    value={waitlistForm.email}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, email: e.target.value })}
                  />
                  <select
                    className="waitlist-input"
                    value={waitlistForm.country}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, country: e.target.value })}
                  >
                    <option value="">Select your country</option>
                    {[
                      "Algeria","Angola","Argentina","Australia","Austria","Bangladesh","Belgium","Benin","Botswana","Brazil",
                      "Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Chile","China","Colombia","Congo (DRC)","Costa Rica",
                      "Croatia","Czech Republic","Denmark","Dominican Republic","Ecuador","Egypt","Estonia","Ethiopia","Finland",
                      "France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Guatemala","Haiti","Honduras","Hungary",
                      "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kenya",
                      "Kuwait","Latvia","Lebanon","Liberia","Libya","Lithuania","Luxembourg","Madagascar","Malawi","Malaysia",
                      "Mali","Malta","Mexico","Moldova","Mongolia","Morocco","Mozambique","Namibia","Nepal","Netherlands",
                      "New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Peru",
                      "Philippines","Poland","Portugal","Qatar","Romania","Rwanda","Saudi Arabia","Senegal","Serbia","Seychelles",
                      "Sierra Leone","Singapore","Slovakia","Slovenia","Somalia","South Africa","South Korea","Spain","Sri Lanka",
                      "Sudan","Sweden","Switzerland","Syria","Taiwan","Tanzania","Thailand","Togo","Tunisia","Turkey","Uganda",
                      "Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Venezuela","Vietnam","Yemen",
                      "Zambia","Zimbabwe"
                    ].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <textarea
                    className="waitlist-input"
                    placeholder="Describe your community idea (optional)"
                    rows={3}
                    value={waitlistForm.community_idea}
                    onChange={(e) => setWaitlistForm({ ...waitlistForm, community_idea: e.target.value })}
                  />
                  <button
                    className="waitlist-submit-btn"
                    onClick={handleWaitlistSubmit}
                    disabled={waitlistLoading}
                  >
                    {waitlistLoading ? "Submitting..." : "Submit Request"}
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <style>{`
          .join-community-btn {
            margin-top: 12px;
            padding: 10px 14px;
            border-radius: 8px;
            background: #111827;
            color: #ffffff;
            border: none;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
          }

          .join-community-btn:hover {
            background: #000000;
          }

          .community-card--soon {
            opacity: 0.6;
            filter: grayscale(1);
            pointer-events: none;
          }

          .community-card-skeleton {
            pointer-events: none;
          }

          .community-skeleton {
            border-radius: 10px;
            background: linear-gradient(
              100deg,
              rgba(148, 163, 184, 0.18) 20%,
              rgba(148, 163, 184, 0.34) 45%,
              rgba(148, 163, 184, 0.18) 70%
            );
            background-size: 240% 100%;
            animation: community-skeleton-shimmer 1.3s ease infinite;
          }

          .community-skeleton-image {
            width: 100%;
            aspect-ratio: 16 / 9;
            border-radius: 12px 12px 0 0;
          }

          .community-skeleton-title {
            width: 72%;
            height: 22px;
            margin-bottom: 10px;
          }

          .community-skeleton-line {
            width: 94%;
            height: 14px;
            margin-bottom: 8px;
          }

          .community-skeleton-line.short {
            width: 82%;
            margin-bottom: 14px;
          }

          .community-skeleton-button {
            width: 120px;
            height: 38px;
            border-radius: 8px;
            margin-bottom: 14px;
          }

          .community-skeleton-meta {
            width: 55%;
            height: 14px;
          }

          @keyframes community-skeleton-shimmer {
            0% { background-position: 100% 0; }
            100% { background-position: -100% 0; }
          }

          .community-soon {
            display: inline-block;
            margin-top: 12px;
            padding: 8px 12px;
            border-radius: 999px;
            background: #f1f5f9;
            color: #475569;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }

          .community-waitlist {
            margin: 56px auto 40px;
            text-align: center;
          }

          .community-waitlist h2 {
            font-size: 1.75rem;
            margin-bottom: 10px;
          }

          .community-waitlist p {
            color: #64748b;
            margin-bottom: 18px;
          }

          .community-waitlist-btn {
            padding: 12px 20px;
            border-radius: 999px;
            border: 1px solid #111827;
            background: #ffffff;
            color: #111827;
            font-weight: 600;
            cursor: pointer;
          }

          .community-waitlist-btn:hover {
            background: #111827;
            color: #ffffff;
          }

          .pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }

          .discover-countdown {
            display: none;
          }

          .waitlist-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.45);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1100;
          }

          .waitlist-dialog {
            position: relative;
            background: #fff;
            border-radius: 16px;
            padding: 32px;
            max-width: 440px;
            width: 90%;
            text-align: left;
          }

          .waitlist-close-btn {
            position: absolute;
            top: 12px;
            right: 12px;
            width: 32px;
            height: 32px;
            border: none;
            border-radius: 999px;
            background: #f3f4f6;
            color: #111827;
            font-size: 22px;
            line-height: 1;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .waitlist-close-btn:hover {
            background: #e5e7eb;
          }

          .waitlist-dialog h3 {
            font-size: 20px;
            font-weight: 700;
          }

          .waitlist-input {
            width: 100%;
            padding: 11px 14px;
            border-radius: 10px;
            border: 1px solid #e5e7eb;
            font-size: 14px;
            margin-bottom: 12px;
            font-family: inherit;
            resize: vertical;
          }

          .waitlist-input:focus {
            outline: none;
            border-color: #111827;
          }

          .waitlist-submit-btn {
            width: 100%;
            padding: 12px;
            border-radius: 10px;
            border: none;
            background: #111827;
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 4px;
          }

          .waitlist-submit-btn:hover {
            background: #000;
          }

          .waitlist-submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
        `}</style>
      </div>
    );
  }