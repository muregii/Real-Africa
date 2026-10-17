import React from "react";
import { Link } from "react-router-dom";
import { interviews } from "../data/interviews";

const ARTICLE_SLUGS = [
  "what-bigs-1-5-million-raise-means-for-africa",
  "scale-leadership-peter-nduati",
  "climate-innovation-uzoma-ayogu",
  "curiosity-to-inclusion-elly-savatia",
  "navigating-borders-g-o-ouma",
];
const articles = ARTICLE_SLUGS.map(s => interviews.find(i => i.slug === s)).filter(Boolean);

export default function Articles() {
  return (
    <section className="gallery-articles">
      <style>{`
        .gallery-articles {
          min-height: 100vh;
          background: #f8fafc;
          padding: clamp(40px, 6vw, 80px) clamp(16px, 4vw, 64px);
          font-family: 'Space Grotesk', sans-serif;
        }

        .gallery-header {
          max-width: 680px;
          margin: 0 auto 48px;
          text-align: center;
        }

        .gallery-header h1 {
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 700;
          color: #1f2230;
          margin-bottom: 14px;
        }

        .gallery-header p {
          font-size: clamp(15px, 1.8vw, 17px);
          line-height: 1.7;
          color: #6b7280;
        }

        .gallery-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 28px;
        }

        .gallery-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: pointer;
        }

        .gallery-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
        }

        .gallery-card__img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #e5e7eb;
        }

        .gallery-card__img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .gallery-card:hover .gallery-card__img-wrap img {
          transform: scale(1.04);
        }

        .gallery-card__badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(31, 34, 48, 0.75);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          color: #ffffff;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 6px;
        }

        .gallery-card__body {
          padding: 22px 24px 28px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .gallery-card__meta {
          font-size: 13px;
          color: #9ca3af;
          margin-bottom: 10px;
        }

        .gallery-card__meta span {
          color: #7c3aed;
          font-weight: 500;
        }

        .gallery-card__title {
          font-size: 19px;
          font-weight: 700;
          line-height: 1.4;
          color: #1f2230;
          margin-bottom: 10px;
        }

        .gallery-card__summary {
          font-size: 14px;
          line-height: 1.65;
          color: #6b7280;
          flex: 1;
        }

        .gallery-card__read {
          margin-top: 16px;
          font-size: 13px;
          font-weight: 600;
          color: #c9922a;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .gallery-card__read svg {
          width: 14px;
          height: 14px;
          transition: transform 0.2s ease;
        }

        .gallery-card:hover .gallery-card__read svg {
          transform: translateX(3px);
        }

        @media (max-width: 720px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="gallery-header">
        <h1>All Articles</h1>
        <p>
          In-depth stories on founders, leaders, and innovators shaping the
          future of Africa. Real narratives, real impact.
        </p>
      </div>

      <div className="gallery-grid">
        <Link
          to="/articles/freelance-story-contributor"
          className="gallery-card"
        >
          <div className="gallery-card__img-wrap" style={{ background: "#eeebfa", display: "flex", alignItems: "center", justifyContent: "center", padding: 28 }}>
            <span style={{ color: "#3f3179", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700, lineHeight: 1.15, textAlign: "center" }}>
              Tell the story others missed.
            </span>
            <div className="gallery-card__badge">Opportunity</div>
          </div>
          <div className="gallery-card__body">
            <div className="gallery-card__meta">The Real Africa · Rolling call</div>
            <h3 className="gallery-card__title">Freelance Story Contributors wanted</h3>
            <p className="gallery-card__summary">
              Pitch an African founder story worth a closer look. Paid assignments, byline, and an open call to contributors anywhere.
            </p>
            <span className="gallery-card__read">Read the opportunity →</span>
          </div>
        </Link>
        {articles.map((item) => (
          <Link
            key={item.slug}
            to={`/articles/${item.slug}`}
            className="gallery-card"
          >
            <div className="gallery-card__img-wrap">
              <img src={item.heroImage} alt={item.title} loading="lazy" />
              <div className="gallery-card__badge">Article</div>
            </div>

            <div className="gallery-card__body">
              <div className="gallery-card__meta">
                By <span>{item.author}</span> &middot; {item.date}
              </div>
              <h3 className="gallery-card__title">{item.title}</h3>
              <p className="gallery-card__summary">{item.summary}</p>
              <div className="gallery-card__read">
                Read article
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
