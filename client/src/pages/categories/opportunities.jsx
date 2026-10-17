import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const JOBS = [
  { title: "Software Engineer", type: "Part Time", location: "South Africa", category: "Developer" },
  { title: "Product Designer", type: "Part Time", location: "Kenya", category: "Designer" },
  { title: "UI / UX Designer", type: "Part Time", location: "Nigeria", category: "Designer" },
  { title: "Product Manager", type: "Full Time", location: "Ghana", category: "Marketing" },
  { title: "Recruiting Coordinator", type: "Part Time", location: "Tanzania", category: "Recruiting" },
  { title: "Customer Support", type: "Part Time", location: "Morocco", category: "Support" },
];

const SIDEBAR_LINKS = [
  { label: "Opportunities", slug: "opportunities" },
  { label: "Interviews", slug: "interviews" },
  { label: "Featured CEOs", slug: "featured-ceos" },
  { label: "Technology", slug: "technology" },
];

const TAGS = ["Business", "Experience", "Technology", "Marketing", "Design", "Remote"];

const Categories = () => {
  const navigate = useNavigate();
  const [showNotify, setShowNotify] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySent, setNotifySent] = useState(false);

  return (
    <div className="opps-page">
      <style>{`
        .opps-page {
          min-height: 100vh;
          background: #f8fafc;
          font-family: 'Space Grotesk', sans-serif;
        }

        /* Hero */
        .opps-hero {
          background: #1f2230;
          padding: clamp(48px, 8vw, 80px) clamp(16px, 4vw, 64px);
          text-align: center;
        }

        .opps-hero__breadcrumb {
          font-size: 13px;
          font-weight: 500;
          color: #9ca3af;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .opps-hero__breadcrumb a {
          color: #9ca3af;
          text-decoration: none;
        }

        .opps-hero__breadcrumb a:hover {
          color: #ffffff;
        }

        .opps-hero h1 {
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 14px;
        }

        .opps-hero p {
          font-size: 17px;
          line-height: 1.65;
          color: #9ca3af;
          max-width: 540px;
          margin: 0 auto;
        }

        /* Layout */
        .opps-layout {
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px clamp(16px, 4vw, 40px) 80px;
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 48px;
          align-items: start;
        }

        /* Jobs Section */
        .opps-main h2 {
          font-size: 24px;
          font-weight: 700;
          color: #1f2230;
          margin: 0 0 28px;
        }

        .opps-jobs {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .opps-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          position: relative;
        }

        .opps-jobs .opps-card {
          opacity: 0.5;
          pointer-events: none;
          user-select: none;
        }

        .opps-card--open {
          margin-bottom: 36px;
          border-color: #e3cc9c;
          box-shadow: 0 8px 30px rgba(31, 34, 48, 0.06);
        }

        .opps-card--open .opps-card__category {
          color: #475569;
          font-size: 14px;
          line-height: 1.6;
        }

        .opps-card__details {
          color: #475569;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }

        .opps-card__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 4px;
        }

        .opps-card__actions a {
          align-items: center;
          display: inline-flex;
          justify-content: center;
          min-height: 42px;
          padding: 0 18px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
        }

        .opps-card__actions a:first-child {
          background: #1f2230;
          color: #ffffff;
        }

        .opps-card__actions a:last-child {
          border: 1px solid #1f2230;
          color: #1f2230;
        }

        .opps-card__tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .opps-card__tag {
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .opps-card__tag--type {
          background: #f0fdf4;
          color: #16a34a;
          border: 1px solid #bbf7d0;
        }

        .opps-card__tag--location {
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #bfdbfe;
        }

        .opps-card__title {
          font-size: 18px;
          font-weight: 700;
          color: #1f2230;
          margin: 0;
        }

        .opps-card__category {
          font-size: 13px;
          color: #9ca3af;
          margin: 0;
        }

        .opps-card__salary {
          font-size: 14px;
          font-weight: 600;
          color: #475569;
        }

        .opps-card__apply {
          padding: 10px 0;
          border-radius: 10px;
          border: 1.5px solid #1f2230;
          background: transparent;
          color: #1f2230;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .opps-card__apply:hover {
          background: #1f2230;
          color: #ffffff;
        }

        /* Coming Soon Banner */
        .opps-coming {
          margin-top: 32px;
          text-align: center;
          padding: 24px;
          background: #1f2230;
          border-radius: 14px;
        }

        .opps-coming p {
          color: #9ca3af;
          font-size: 14px;
          margin: 0 0 14px;
        }

        .opps-coming__btn {
          padding: 11px 28px;
          border-radius: 999px;
          border: none;
          background: #c9922a;
          color: #ffffff;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .opps-coming__btn:hover {
          background: #b07d1e;
        }

        /* Sidebar */
        .opps-sidebar {
          position: sticky;
          top: 100px;
        }

        .opps-sidebar__section {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 24px;
          margin-bottom: 20px;
        }

        .opps-sidebar__section h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1f2230;
          margin: 0 0 16px;
        }

        .opps-sidebar__link {
          display: block;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.15s ease;
          margin-bottom: 6px;
        }

        .opps-sidebar__link:hover {
          background: #f1f5f9;
          color: #1f2230;
        }

        .opps-sidebar__link--active {
          background: #c9922a;
          color: #ffffff;
        }

        .opps-sidebar__link--active:hover {
          background: #b07d1e;
          color: #ffffff;
        }

        .opps-sidebar__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .opps-sidebar__tag {
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          font-size: 13px;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .opps-sidebar__tag:hover {
          border-color: #1f2230;
          color: #1f2230;
        }

        /* Notify Modal */
        .opps-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1100;
        }

        .opps-modal {
          background: #ffffff;
          border-radius: 18px;
          padding: 32px;
          max-width: 420px;
          width: 90%;
        }

        .opps-modal h3 {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 8px;
        }

        .opps-modal p {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 20px;
          line-height: 1.5;
        }

        .opps-modal__input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
          font-family: inherit;
          font-size: 14px;
          margin-bottom: 16px;
          box-sizing: border-box;
        }

        .opps-modal__input:focus {
          outline: none;
          border-color: #1f2230;
        }

        .opps-modal__actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        .opps-modal__actions button {
          padding: 10px 22px;
          border-radius: 10px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .opps-modal__cancel {
          border: 1px solid #e5e7eb;
          background: #ffffff;
          color: #475569;
        }

        .opps-modal__submit {
          border: none;
          background: #1f2230;
          color: #ffffff;
        }

        .opps-modal__submit:hover {
          background: #000000;
        }

        .opps-modal__success {
          color: #16a34a;
          font-weight: 600;
          font-size: 15px;
        }

        @media (max-width: 900px) {
          .opps-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .opps-sidebar {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .opps-jobs {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Hero */}
      <div className="opps-hero">
        <div className="opps-hero__breadcrumb">
          <a onClick={() => navigate("/")}>Home</a> &rsaquo; Opportunities
        </div>
        <h1>Opportunities</h1>
        <p>
          Discover curated job opportunities, freelance roles, and career paths
          across Africa and beyond.
        </p>
      </div>

      {/* Layout */}
      <div className="opps-layout">
        {/* Main */}
        <div className="opps-main">
          <h2>Open opportunity</h2>

          <article className="opps-card opps-card--open">
            <div className="opps-card__tags">
              <span className="opps-card__tag opps-card__tag--type">Paid freelance assignment</span>
              <span className="opps-card__tag opps-card__tag--location">Open worldwide · Remote</span>
            </div>
            <h3 className="opps-card__title">Freelance Story Contributor</h3>
            <p className="opps-card__category">
              Pitch an underreported African founder story for The Real Africa.
              Assignments are agreed story by story, with a fee offered after proposal approval.
            </p>
            <p className="opps-card__details">
              Rolling call · Pitch and write in your preferred language · Byline and portfolio use
            </p>
            <div className="opps-card__actions">
              <a href="https://forms.gle/8ne2SfFkss36xSq9A" target="_blank" rel="noopener noreferrer">
                Submit a proposal ↗
              </a>
              <Link to="/articles/freelance-story-contributor">Read the full opportunity</Link>
            </div>
          </article>

          <h2>More opportunities coming soon</h2>

          <div className="opps-jobs">
            {JOBS.map((job, i) => (
              <div key={i} className="opps-card">
                <div className="opps-card__tags">
                  <span className="opps-card__tag opps-card__tag--type">{job.type}</span>
                  <span className="opps-card__tag opps-card__tag--location">{job.location}</span>
                </div>
                <h3 className="opps-card__title">{job.title}</h3>
                <p className="opps-card__category">{job.category}</p>
                <div className="opps-card__salary">$2,000 – $5,000 / Monthly</div>
                <button className="opps-card__apply">Apply Now</button>
              </div>
            ))}
          </div>

          <div className="opps-coming">
            <p>This section is still being built. Get notified when it goes live.</p>
            <button className="opps-coming__btn" onClick={() => setShowNotify(true)}>
              Get Notified
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="opps-sidebar">
          <div className="opps-sidebar__section">
            <h3>Categories</h3>
            {SIDEBAR_LINKS.map((item) => (
              <div
                key={item.slug}
                className={`opps-sidebar__link ${item.slug === "opportunities" ? "opps-sidebar__link--active" : ""}`}
                onClick={() => navigate(`/${item.slug}`)}
              >
                {item.label}
              </div>
            ))}
          </div>

          <div className="opps-sidebar__section">
            <h3>Tags</h3>
            <div className="opps-sidebar__tags">
              {TAGS.map((tag) => (
                <span key={tag} className="opps-sidebar__tag">{tag}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Notify Modal */}
      {showNotify && (
        <div className="opps-modal-overlay" onClick={() => { setShowNotify(false); setNotifySent(false); setNotifyEmail(""); }}>
          <div className="opps-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Get Notified</h3>
            {notifySent ? (
              <p className="opps-modal__success">You're on the list. We'll be in touch!</p>
            ) : (
              <p>Enter your email and we'll let you know when opportunities go live.</p>
            )}
            {!notifySent && (
              <>
                <input
                  className="opps-modal__input"
                  type="email"
                  placeholder="you@email.com"
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                />
                <div className="opps-modal__actions">
                  <button className="opps-modal__cancel" onClick={() => { setShowNotify(false); setNotifyEmail(""); }}>Cancel</button>
                  <button className="opps-modal__submit" onClick={() => { if (notifyEmail) setNotifySent(true); }}>Notify Me</button>
                </div>
              </>
            )}
            {notifySent && (
              <div className="opps-modal__actions" style={{ marginTop: 16 }}>
                <button className="opps-modal__submit" onClick={() => { setShowNotify(false); setNotifySent(false); setNotifyEmail(""); }}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
