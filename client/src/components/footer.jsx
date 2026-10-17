import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTiktok } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const lastSubmitRef = useRef(0);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const now = Date.now();
    if (now - lastSubmitRef.current < 30_000) {
      setErrorMsg("Please wait a moment before trying again.");
      return;
    }
    lastSubmitRef.current = now;

    if (!supabase) {
      setErrorMsg("Supabase is not configured.");
      return;
    }

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMsg("Please enter an email address.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("subscriptions")
        .insert([{ email: trimmedEmail, source: "footer" }]);

      if (error) {
        if (error.code === "23505") {
          setSubscribed(true);
          return;
        }
        setErrorMsg("We couldn't subscribe you right now. Please try again later.");
        return;
      }
      setSubscribed(true);
      setEmail("");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      <style>{`
        .footer {
          background: #1f2230;
          color: #ffffff;
          font-family: 'Space Grotesk', sans-serif;
          padding: 0;
        }

        .footer__top {
          max-width: 1200px;
          margin: 0 auto;
          padding: 64px clamp(20px, 4vw, 40px) 48px;
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 48px;
        }

        .footer__brand p {
          font-size: 14px;
          line-height: 1.7;
          color: #9ca3af;
          margin: 12px 0 24px;
          max-width: 280px;
        }

        .footer__brand-name {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
        }

        .footer__brand-name span {
          color: #d4a843;
        }

        .footer__socials {
          display: flex;
          gap: 14px;
        }

        .footer__socials a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.06);
          color: #9ca3af;
          font-size: 16px;
          transition: all 0.2s ease;
        }

        .footer__socials a:hover {
          background: #d4a843;
          color: #1f2230;
        }

        .footer__col h4 {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin: 0 0 20px;
        }

        .footer__col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer__col li {
          margin-bottom: 12px;
        }

        .footer__col a {
          font-size: 14px;
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .footer__col a:hover {
          color: #ffffff;
        }

        .footer__contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 14px;
          font-size: 14px;
          color: #9ca3af;
          line-height: 1.5;
        }

        .footer__contact-item svg {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          margin-top: 3px;
          opacity: 0.6;
        }

        .footer__contact-item a {
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .footer__contact-item a:hover {
          color: #ffffff;
        }

        .footer__newsletter-section {
          background: rgba(255, 255, 255, 0.03);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .footer__newsletter-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px clamp(20px, 4vw, 40px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }

        .footer__newsletter-text h3 {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 4px;
        }

        .footer__newsletter-text p {
          font-size: 14px;
          color: #9ca3af;
          margin: 0;
        }

        .footer__form {
          display: flex;
          gap: 0;
        }

        .footer__input {
          width: 260px;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-right: none;
          color: #ffffff;
          font-family: inherit;
          font-size: 14px;
          border-radius: 10px 0 0 10px;
        }

        .footer__input::placeholder {
          color: #6b7280;
        }

        .footer__input:focus {
          outline: none;
          border-color: #d4a843;
        }

        .footer__button {
          padding: 12px 24px;
          background: #d4a843;
          border: none;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          color: #1f2230;
          cursor: pointer;
          border-radius: 0 10px 10px 0;
          transition: background 0.2s ease;
          white-space: nowrap;
        }

        .footer__button:hover {
          background: #c9922a;
        }

        .footer__confirmation {
          font-size: 14px;
          color: #9ca3af;
        }

        .footer__confirmation strong {
          color: #d4a843;
        }

        .footer__error {
          font-size: 13px;
          color: #f87171;
          margin: 8px 0 0;
        }

        .footer__bottom-bar {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .footer__bottom-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px clamp(20px, 4vw, 40px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: #6b7280;
        }

        .footer__legal a {
          color: #6b7280;
          text-decoration: none;
          margin-left: 20px;
        }

        .footer__legal a:hover {
          color: #9ca3af;
        }

        @media (max-width: 900px) {
          .footer__top {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }

          .footer__newsletter-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer__form {
            width: 100%;
          }

          .footer__input {
            flex: 1;
            width: auto;
          }
        }

        @media (max-width: 540px) {
          .footer__top {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .footer__bottom-inner {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }

          .footer__legal a {
            margin-left: 12px;
          }
        }
      `}</style>

      {/* Columns */}
      <div className="footer__top">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__brand-name">
            The Real <span>Africa</span>
          </div>
          <p>
            Telling the real stories behind Africa's booming tech and business scenes.
            Built by Africans, for the world.
          </p>
          <div className="footer__socials">
            <a href="https://twitter.com/therealafrica" target="_blank" rel="noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com/therealafrica" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/company/the-real-africa/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://youtube.com/@therealafrica" target="_blank" rel="noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="https://tiktok.com/@therealafrica" target="_blank" rel="noreferrer" aria-label="TikTok">
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* Explore */}
        <div className="footer__col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/articles">Articles</Link></li>
            <li><Link to="/interviews">Interviews</Link></li>
            <li><Link to="/communities">Communities</Link></li>
            <li><Link to="/travel">Travel</Link></li>
            <li><Link to="/opportunities">Opportunities</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div className="footer__col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/featured-ceos">Featured CEOs</Link></li>
            <li><Link to="/communities">Explore Communities</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h4>Contact</h4>
          <div className="footer__contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <a href="mailto:therealafrica.co@gmail.com">therealafrica.co@gmail.com</a>
          </div>
          <div className="footer__contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z"/>
            </svg>
            <a href="tel:+19197489995">+1 (919) 748-9995</a>
          </div>
          <div className="footer__contact-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Nairobi, Kenya</span>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="footer__newsletter-section">
        <div className="footer__newsletter-inner">
          <div className="footer__newsletter-text">
            <h3>Stay in the loop</h3>
            <p>Get stories, opportunities, and updates from across Africa.</p>
          </div>

          {!subscribed && !loading ? (
            <form className="footer__form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                className="footer__input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="footer__button">Subscribe</button>
              {errorMsg && <p className="footer__error">{errorMsg}</p>}
            </form>
          ) : loading ? (
            <div className="footer__confirmation"><p><strong>Subscribing...</strong></p></div>
          ) : (
            <div className="footer__confirmation">
              <p><strong>You're in.</strong> We'll be in touch with stories and updates.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom-bar">
        <div className="footer__bottom-inner">
          <span>&copy; {new Date().getFullYear()} The Real Africa. All rights reserved.</span>
          <div className="footer__legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
