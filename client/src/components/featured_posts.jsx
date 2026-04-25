import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

if (typeof window !== "undefined") {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute(
    "data-theme",
    prefersDark ? "dark" : "light"
  );
}

function FeaturedPosts() {
  const [isSectionLoading, setIsSectionLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSectionLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const featured = {
    author: "Michael H",
    date: "August 1, 2025",
    title: "If You Don't Trust Yourself, Take a Job!",
    summary: "Peter Nduati talks about the harsh realities of the day-to-day entrepreneur.",
    slug: "scale-leadership-peter-nduati",
    image: "/assets/nduati.png",
  };

  const posts = [
    {
      author: "Raydon Muregi",
      date: "August 1, 2025",
      title: "Climate Innovation on a Global Stage: Why Uzoma Bailey Ayogu is a Forbes 30 Under 30 Trailblazer.",
      highlight: true,
      slug: "climate-innovation-uzoma-ayogu",
    },
    {
      author: "Raydon Muregi",
      date: "Jan 2, 2026",
      title: "From Curiosity to Inclusion: How Elly Savatia is Engineering a More Accessible Africa.",
      highlight: false,
      slug: "curiosity-to-inclusion-elly-savatia",
    },
    {
      author: "Raydon Muregi",
      date: "December 9, 2025",
      title: "The Art of the Scale: Lessons in Leadership and Resilience from Peter Nduati.",
      highlight: true,
      slug: "scale-leadership-peter-nduati",
    },
  ];

  return (
    <section
      className="featured-posts-section"
      style={{
        padding: "clamp(64px, 8vw, 120px) clamp(16px, 6vw, 64px)",
        background: "var(--bg)",
        color: "var(--text-primary)",
        boxSizing: "border-box",
        fontFamily: "Space Grotesk, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 36px)",
            fontFamily: "inherit",
            fontWeight: 700,
            color: "var(--text-primary)",
          }}
        >
          All Posts
        </h2>

        <Link
          to="/articles"
          style={{
            fontSize: 16,
            fontFamily: "inherit",
            color: "var(--accent)",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          View All
        </Link>
      </div>

      <div className="featured-posts-wrapper">
        {/* Layout */}
        <div
          className="featured-posts-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "40px",
            position: "relative",
          }}
        >
          {isSectionLoading ? (
            <>
              <div
                className="featured-post-main"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
                aria-hidden="true"
              >
                <div className="featured-skeleton" style={{ width: "100%", aspectRatio: "16 / 9", borderRadius: 12 }} />
                <div className="featured-skeleton" style={{ width: "42%", height: 16 }} />
                <div className="featured-skeleton" style={{ width: "90%", height: 36, borderRadius: 10 }} />
                <div className="featured-skeleton" style={{ width: "84%", height: 16 }} />
                <div className="featured-skeleton" style={{ width: "72%", height: 16 }} />
                <div className="featured-skeleton" style={{ width: 220, height: 52, borderRadius: 999 }} />
              </div>

              <div
                className="featured-posts-list"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
                aria-hidden="true"
              >
                {[0, 1, 2].map((item) => (
                  <div
                    key={item}
                    style={{
                      padding: "20px 24px",
                      borderRadius: 20,
                      border: "1px solid var(--border-subtle)",
                      background: "var(--surface-1)",
                    }}
                  >
                    <div className="featured-skeleton" style={{ width: "48%", height: 14, marginBottom: 10 }} />
                    <div className="featured-skeleton" style={{ width: "92%", height: 20, marginBottom: 8 }} />
                    <div className="featured-skeleton" style={{ width: "80%", height: 20 }} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Featured */}
              <div
                className="featured-post-main"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <img
                  src={featured.image}
                  alt={featured.title}
                  style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    objectFit: "cover",
                    borderRadius: 12,
                  }}
                />

                <div
                  style={{
                    fontFamily: "inherit",
                    fontSize: 14,
                    color: "var(--text-secondary)",
                  }}
                >
                  By <span style={{ color: "var(--accent)" }}>{featured.author}</span> | {featured.date}
                </div>

                <h3
                  style={{
                    fontFamily: "inherit",
                    fontSize: "clamp(22px, 3vw, 28px)",
                    fontWeight: 700,
                    lineHeight: "1.4",
                    color: "var(--text-primary)",
                  }}
                >
                  {featured.title}
                </h3>

                <p
                  style={{
                    fontFamily: "inherit",
                    fontSize: 16,
                    lineHeight: "1.7",
                    color: "var(--text-secondary)",
                    maxWidth: 600,
                  }}
                >
                  {featured.summary}
                </p>

                <Link
                  to={`/articles/${featured.slug}`}
                  style={{ textDecoration: "none", alignSelf: "flex-start", width: "100%", maxWidth: 280 }}
                >
                  <button
                    style={{
                      padding: "14px 40px",
                      background: "#FCD34D",
                      borderRadius: 50,
                      border: "1px solid #1f2937",
                      fontFamily: "inherit",
                      fontSize: 18,
                      fontWeight: 700,
                      cursor: "pointer",
                      color: "#1f2937",
                      boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.15)",
                      width: "100%",
                    }}
                  >
                    Read More &gt;
                  </button>
                </Link>
              </div>

              {/* List */}
              <div
                className="featured-posts-list"
                data-list
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  width: "100%",
                  maxHeight: 520,
                  overflowY: "auto",
                  paddingRight: 8,
                }}
              >
                {posts.map((post, i) => (
                  <Link
                    key={post.slug}
                    to={`/articles/${post.slug}`}
                    className="featured-post-card"
                    style={{
                      padding: "20px 24px",
                      borderRadius: 20,
                      border: "1px solid var(--border-subtle)",
                      background: post.highlight
                        ? "var(--highlight-bg)"
                        : "var(--surface-1)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "inherit",
                        fontSize: 14,
                        color: "var(--text-secondary)",
                        marginBottom: 8,
                      }}
                    >
                      By <span style={{ color: "var(--accent)" }}>{post.author}</span> | {post.date}
                    </div>

                    <h4
                      style={{
                        fontFamily: "inherit",
                        fontSize: 20,
                        fontWeight: 700,
                        lineHeight: "1.5",
                        color: "var(--text-primary)",
                      }}
                    >
                      {post.title}
                    </h4>
                  </Link>
                ))}
                <div
                  aria-hidden
                  style={{
                    position: "sticky",
                    bottom: 0,
                    height: 80,
                    background: "linear-gradient(to bottom, rgba(0,0,0,0), var(--bg))",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile stacking */}
      <style>
        {`
          :root {
            /* Light mode surfaces */
            --bg: #ffffff;
            --surface-1: #ffffff;
            --surface-2: #fbf6ea;
            --border-subtle: #e5e7eb;

            /* Light mode text */
            --text-primary: #232536;
            --text-secondary: #4c4c4c;
            --text-muted: #6d6e76;

            /* Brand */
            --accent: #592ea9;
            --highlight-bg: #fbf6ea;
          }

          [data-theme="dark"] {
            /* Dark mode surfaces (no pure black) */
            --bg: #121212;
            --surface-1: #18181b;
            --surface-2: #1f1f23;
            --border-subtle: #2a2a2f;

            /* Dark mode text (no pure white) */
            --text-primary: #eaeaf0;
            --text-secondary: #b3b3c2;
            --text-muted: #8b8b9a;

            /* Brand */
            --accent: #a78bfa;
            --highlight-bg: rgba(167, 139, 250, 0.12);
          }

          .featured-skeleton {
            border-radius: 10px;
            background: linear-gradient(
              100deg,
              rgba(148, 163, 184, 0.18) 20%,
              rgba(148, 163, 184, 0.32) 45%,
              rgba(148, 163, 184, 0.18) 70%
            );
            background-size: 240% 100%;
            animation: featured-skeleton-shimmer 1.3s ease infinite;
          }

          @keyframes featured-skeleton-shimmer {
            0% { background-position: 100% 0; }
            100% { background-position: -100% 0; }
          }

          @media (min-width: 901px) {
            .featured-posts-grid {
              display: grid;
            }
            .featured-posts-list::-webkit-scrollbar {
              width: 6px;
            }
            .featured-posts-list::-webkit-scrollbar-thumb {
              background: var(--border-subtle);
              border-radius: 8px;
            }
          }

          @media (max-width: 900px) {
            .featured-posts-grid {
              display: flex;
              flex-direction: column;
              gap: 48px;
            }

            .featured-post-main {
              order: 1;
            }

            .featured-posts-list {
              order: 2;
              display: flex;
              flex-direction: column;
              gap: 20px;
              width: 100%;
              max-height: none;
              overflow: visible;
            }

            .featured-post-card {
              width: 100%;
              padding: 20px;
            }

            .featured-post-card h4 {
              font-size: 18px;
              line-height: 1.45;
            }
          }
        `}
      </style> 
    </section>
  );
}

export default FeaturedPosts;