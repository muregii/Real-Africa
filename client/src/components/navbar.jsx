import React from 'react';
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../lib/authContext";
import AccountMenu from "./AccountMenu";


const Navbar = ({ onGetFeatured }) => {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const { user, profile } = useAuth();

  
  return (
    <>
      {/* Inline CSS for Navbar */}
      <style>{`
        body {
          overflow-x: hidden;
        }
        :root {
          --font-grotesk: "Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
        }
        *, *::before, *::after {
          box-sizing: border-box;
        }
        .navbar {
          height: 72px;
          padding: 0 24px;
          background: linear-gradient(90deg, #1f2230 0%, #232536 100%);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          position: relative;
          z-index: 1001;
          box-sizing: border-box;
          width: 100%;
          overflow: visible;
        }

        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .navbar__logo img {
          height: 44px;
          width: auto;
          border-radius: 0;
          object-fit: contain;
        }

        .navbar__logo-text {
          font-family: var(--font-grotesk);
          font-size: 16px;
          font-weight: 700;
          white-space: nowrap;
          line-height: 1.2;
        }

        .navbar__logo-text .the-real {
          color: #ffffff;
        }

        .navbar__logo-text .africa {
          color: #d4a843;
          font-size: 18px;
          letter-spacing: 0.08em;
        }

        .navbar__right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 24px;
          min-width: 0;
          flex-shrink: 1;
          position: relative;
          z-index: 1002;
        }

        .navbar__links {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: nowrap;
          white-space: nowrap;
        }

        .navbar__links a {
          color: #ffffff;
          text-decoration: none;
          font-family: var(--font-grotesk);
          font-size: 14px;
          font-weight: 500;
          position: relative;
        }
        .navbar__cta {
          text-decoration: none !important;
        }

        .navbar__links a::after {
          content: "";
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 0%;
          height: 2px;
          background: #ffffff;
          transition: width 0.25s ease;
        }
        .navbar__cta::after {
          display: none !important;
        }

        .navbar__links a:hover::after {
          width: 100%;
        }

        .navbar__cta {
          background: #ffffff;
          border-radius: 8px;
          color: #1f2230;
          padding: 12px 22px;
          font-family: var(--font-grotesk);
          font-size: 14px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          transition: padding 0.2s ease;
        }

        .navbar__cta-title {
          font-size: 14px;
          font-weight: 700;
          line-height: 1.1;
        }

        .navbar__cta-subtitle {
          color: rgba(31, 34, 48, 0.7);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0;
          max-height: 0;
          overflow: hidden;
          pointer-events: none;
          transition: opacity 0.2s ease, max-height 0.2s ease;
        }

        .navbar__cta:hover .navbar__cta-subtitle {
          opacity: 1;
          max-height: 16px;
        }

        .navbar__cta:hover {
          padding: 10px 22px 18px;
        }

        .navbar__auth {
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: 999px;
          padding: 10px 18px;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          text-decoration: none;
          transition: border-color 0.2s ease;
        }

        .navbar__auth:hover {
          border-color: #ffffff;
        }

        .navbar__more-wrapper {
          position: relative;
          padding: 12px 0;
        }

        .navbar__more-btn {
          background: none;
          border: none;
          color: #ffffff;
          font-family: var(--font-grotesk);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 0;
        }

        .navbar__more-btn svg {
          width: 14px;
          height: 14px;
          transition: transform 0.2s ease;
        }

        .navbar__more-btn.open svg {
          transform: rotate(180deg);
        }

        .navbar__more-dropdown {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          padding-top: 8px;
          z-index: 1100;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease;
        }

        .navbar__more-dropdown.show {
          opacity: 1;
          pointer-events: auto;
        }

        .navbar__more-dropdown-inner {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.12);
          min-width: 180px;
          padding: 8px 0;
          overflow: hidden;
        }

        .navbar__more-dropdown-inner a {
          display: block;
          padding: 10px 20px;
          font-family: var(--font-grotesk);
          font-size: 14px;
          font-weight: 500;
          color: #1f2230;
          text-decoration: none;
          transition: background 0.12s ease;
        }

        .navbar__more-dropdown-inner a:hover {
          background: #f8fafc;
        }

        .navbar__more-dropdown-inner a::after {
          display: none !important;
        }

        /* Hamburger */
        .menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 28px;
          cursor: pointer;
          line-height: 1;
        }

        /* Mobile dropdown */
        .mobile-menu {
          position: fixed;
          top: 72px;
          left: 0;
          width: 100%;
          background: #1f2230;
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 32px;
          transform: translateY(-10px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.25s ease;
          z-index: 1000;
          box-sizing: border-box;
          overflow-x: hidden;
          max-width: 100vw;
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .mobile-menu a {
          color: white;
          font-size: 20px;
          text-decoration: none;
          font-family: var(--font-grotesk);
          padding: 8px 0;
        }
        
        .mobile-menu .mobile-cta {
          color: #1f2230 !important;
        }

        /* Scroll down indicator */
.scroll-indicator {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-family: var(--font-grotesk);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #ffffff;
  opacity: 1;
  pointer-events: auto;
  cursor: pointer;
  z-index: 999;
  transition: opacity 0.4s ease;
  max-width: 100%;
  width: fit-content;
  background: rgba(31, 34, 48, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 10px 20px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.scroll-indicator.hidden {
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
}

/* Arrow */
.scroll-indicator .arrow {
  width: 10px;
  height: 10px;
  border-left: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
  transform: rotate(-45deg);
  animation: bounce 1.6s infinite;
}

@keyframes bounce {
  0% { transform: translateY(0) rotate(-45deg); opacity: 0.4; }
  50% { transform: translateY(6px) rotate(-45deg); opacity: 1; }
  100% { transform: translateY(0) rotate(-45deg); opacity: 0.4; }
}      

.mobile-cta {
  margin-top: 12px;
  padding: 16px;
  border-radius: 12px;
  border: none;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  font-family: var(--font-grotesk);
  text-decoration: none !important;
  color: #1f2230 !important;
  background: #ffffff;
  text-align: center;
  display: block;
}

.mobile-cta:hover,
.mobile-cta:active,
.mobile-cta:focus,
.mobile-cta:visited {
  text-decoration: none;
  color: #1f2230;
}

/* Responsive */
@media (max-width: 900px) {
  .navbar__links,
  .navbar__cta {
    display: none;
  }

  .menu-btn {
    display: block;
  }

  .navbar {
    height: 60px;
    padding: 0 12px;
  }

  .navbar__logo img {
    height: 38px;
  }

  .navbar__logo-text {
    font-size: 13px;
  }

  .navbar__logo-text .africa {
    font-size: 15px;
  }
}
      `}</style>

      {/* Navbar */}
      <nav className="navbar">
       
        <Link to="/" className="navbar__logo">
          <img src="/assets/logo.png" alt="Real Africa" />
          <span className="navbar__logo-text">
            <span className="the-real">The Real</span><br/>
            <span className="africa">AFRICA</span>
          </span>
        </Link>

        <div className="navbar__right">
          <div className="navbar__links">
            <Link to="/">Home</Link>
            <Link to="/about-us">About Us</Link>
            <Link to="/travel">Travel</Link>

            <div
              className="navbar__more-wrapper"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button className={`navbar__more-btn${moreOpen ? " open" : ""}`}>
                More
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={`navbar__more-dropdown${moreOpen ? " show" : ""}`}>
                <div className="navbar__more-dropdown-inner">
                  <Link to="/articles" onClick={() => setMoreOpen(false)}>Articles</Link>
                  <Link to="/interviews" onClick={() => setMoreOpen(false)}>Interviews</Link>
                  <Link to="/opportunities" onClick={() => setMoreOpen(false)}>Opportunities</Link>
                  <Link to="/featured-ceos" onClick={() => setMoreOpen(false)}>Featured CEOs</Link>
                </div>
              </div>
            </div>

            <button
              className="navbar__cta"
              style={{
                background: "transparent",
                color: "#ffffff",
                padding: 0,
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
              }}
              onClick={onGetFeatured}
            >
              Get Featured
            </button>
          </div>
          
          <Link
            to="/communities"
            state={{ from: "mentored" }}
            className="navbar__cta"
          >
            <span className="navbar__cta-title">Explore Communities</span>
          </Link>

          {user && profile ? (
            <AccountMenu />
          ) : (
            <Link
              to="/auth"
              state={{ from: location.pathname }}
              className="navbar__auth"
            >
              Log in
            </Link>
          )}
      
          <button
            className="menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </nav>


      {/* Mobile Dropdown */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <Link onClick={() => setOpen(false)} to="/">Home</Link>
        <Link onClick={() => setOpen(false)} to="/about-us">About Us</Link>
        <Link onClick={() => setOpen(false)} to="/travel">Travel</Link>
        <Link onClick={() => setOpen(false)} to="/articles">Articles</Link>
        <Link onClick={() => setOpen(false)} to="/interviews">Interviews</Link>
        <Link onClick={() => setOpen(false)} to="/opportunities">Opportunities</Link>
        
        
    
        <button
          onClick={() => {
            setOpen(false);
            onGetFeatured();
          }}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            color: "white",
            fontSize: "20px",
            textAlign: "left",
            cursor: "pointer",
            fontFamily: "var(--font-grotesk)",
          }}
        >
          Get Featured
        </button>

        <Link
          to="/communities"
          className="mobile-cta"
          state={{ from: "mentored" }}
        >
          Explore Communities
        </Link>

        {!user && (
          <Link
            to="/auth"
            className="mobile-cta"
            state={{ from: location.pathname }}
          >
            Log in
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;