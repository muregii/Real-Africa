import React from 'react';
import { useEffect, useState } from "react";
import GetFeatured from "../components/get-featured";

function Hero() {
  const [open, setOpen] = useState(false);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const heroImageUrl = "/assets/hero_image.jpg";

  useEffect(() => {
    const image = new Image();
    image.src = heroImageUrl;

    const markReady = () => setIsHeroReady(true);
    image.onload = markReady;
    image.onerror = markReady;

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, []);

  return (
    <>
    <style>{`
      .hero-skeleton-block {
        border-radius: 12px;
        background: linear-gradient(
          100deg,
          rgba(255, 255, 255, 0.08) 20%,
          rgba(255, 255, 255, 0.2) 45%,
          rgba(255, 255, 255, 0.08) 70%
        );
        background-size: 240% 100%;
        animation: hero-shimmer 1.4s ease infinite;
      }

      @keyframes hero-shimmer {
        0% { background-position: 100% 0; }
        100% { background-position: -100% 0; }
      }
    `}</style>
    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        backgroundImage: isHeroReady ? `url('${heroImageUrl}')` : "none",
        backgroundColor: "#1f2230",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 5vw, 64px)",
        boxSizing: "border-box",
        fontFamily: "Space Grotesk, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 71.93% 80.99% at 74.58% 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)",
          zIndex: 0,
        }}
      />

      {!isHeroReady && (
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "min(900px, 100%)",
            display: "flex",
            flexDirection: "column",
            marginTop: "-10vh",
            gap: "16px",
          }}
          aria-hidden="true"
        >
          <div className="hero-skeleton-block" style={{ height: 16, width: "38%" }} />
          <div className="hero-skeleton-block" style={{ height: 64, width: "92%", borderRadius: 16 }} />
          <div className="hero-skeleton-block" style={{ height: 18, width: "45%" }} />
          <div className="hero-skeleton-block" style={{ height: 16, width: "88%" }} />
          <div className="hero-skeleton-block" style={{ height: 16, width: "78%" }} />
          <div className="hero-skeleton-block" style={{ height: 52, width: 210, borderRadius: 999 }} />
        </div>
      )}

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 900,
          display: "flex",
          flexDirection: "column",
          marginTop: "-10vh",
          gap: "16px",
          opacity: isHeroReady ? 1 : 0,
          transition: "opacity 0.22s ease",
        }}
      >
        {/* Posted By */}
        <div
          style={{
            color: "white",
            fontFamily: "inherit",
            fontSize: "clamp(12px, 3vw, 16px)",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span style={{ fontWeight: 500 }}>Posted By </span>
          <span style={{ fontWeight: 900 }}>THE REAL AFRICA</span>
        </div>

        {/* Title */}
        <h1
          style={{
            color: "white",
            fontFamily: "inherit",
            fontSize: "clamp(28px, 6vw, 56px)",
            fontWeight: 700,
            lineHeight: "1.15",
            maxWidth: "100%",
          }}
        >
          Showcasing tech talent and business ingenuity in Africa
        </h1>

        {/* Author */}
        <div
          style={{
            fontFamily: "inherit",
            fontSize: "clamp(14px, 3.5vw, 16px)",
            lineHeight: "1.7",
            color: "white",
          }}
        >
          By <span style={{ color: "#FFD050" }}>Raydon Muregi</span> | Jan 23, 2026
        </div>

        {/* Description */}
        <p
          style={{
            maxWidth: 600,
            fontFamily: "inherit",
            fontSize: "clamp(14px, 3.5vw, 16px)",
            lineHeight: "1.7",
            color: "white",
          }}
        >
          We’re always on the look out for visionary founders, tech leaders and ground-breaking startups to share their journey with our global community of builders and investors. Tell us your story and let’s put your innovation on the map.
        </p>

        {/* CTA Button */}
        <button
          style={{
            marginTop: 12,
            alignSelf: "flex-start",
            padding: "clamp(12px, 4vw, 16px) clamp(28px, 8vw, 48px)",
            background: "#FFD050",
            borderRadius: 50,
            border: "1px solid black",
            fontFamily: "inherit",
            fontSize: "clamp(16px, 4vw, 18px)",
            fontWeight: 700,
            color: "#232536",
            cursor: "pointer",
          }}
          onClick={() => setOpen(true)}
        >
          Get Featured
        </button>
      </div>
    </section>

    {open && (
      <GetFeatured onClose={() => setOpen(false)} />
    )}
    </>
  );
}

export default Hero;