import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { interviews } from "../data/interviews";
import { articles as newArticles } from "../data/articles";
import { ARTICLE_VIEW_SLUGS, recordArticleRead } from "../lib/articleViews";
import ArticleReadCount from "../components/ArticleReadCount";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

class MarkdownErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("Markdown render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="interview-body" style={{ whiteSpace: "pre-line" }}>
          {typeof this.props.fallbackText === "string" ? this.props.fallbackText : ""}
        </div>
      );
    }

    return this.props.children;
  }
}

const InterviewSelect = () => {
  const { slug } = useParams();
  const location = useLocation();
  const interview = [...interviews, ...newArticles].find((item) => item.slug === slug);
  const [viewCount, setViewCount] = useState(null);

  useEffect(() => {
    let active = true;
    setViewCount(null);
    if (location.pathname.startsWith("/articles/") && ARTICLE_VIEW_SLUGS.includes(slug)) {
      recordArticleRead(slug)
        .then((count) => { if (active) setViewCount(count); })
        .catch(() => {});
    }
    return () => { active = false; };
  }, [slug, location.pathname]);

  if (!interview) {
    return (
      <main
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 20px",
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
          Interview not found
        </h1>
        <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 24, maxWidth: 440 }}>
          The interview you're looking for doesn't exist or may have been moved.
        </p>
        <Link
          to="/interviews"
          style={{
            padding: "12px 28px",
            borderRadius: 10,
            background: "#111827",
            color: "#fff",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          Browse all interviews
        </Link>
      </main>
    );
  }

  return (
    <main className="interview-detail">
      {/* Header */}
      <header className="interview-header">
        <div className="interview-header-grid">
          {/* Left: Author meta */}
          <div className="interview-meta">
            <span className="interview-author">{interview.author}</span>
            <span className="interview-date">Posted on {interview.date}</span>
            {location.pathname.startsWith("/articles/") && ARTICLE_VIEW_SLUGS.includes(slug) && (
              <ArticleReadCount count={viewCount} />
            )}
          </div>

          {/* Center: Title */}
          <div className="interview-title-wrap">
            <h1 className="interview-title">{interview.title}</h1>
          </div>

          {/* Right: Summary */}
          <div className="interview-summary-wrap">
            <p className="interview-summary">{interview.summary}</p>
          </div>
        </div>
      </header>

      {/* Contained Hero Image */}
      <div
        className={`interview-hero${
          interview.heroShape === "banner" ? " interview-hero--banner" : ""
        }`}
      >
        <img src={interview.heroImage} alt={interview.title} />
      </div>

      {/* Article Body */}
      <MarkdownErrorBoundary fallbackText={interview.body}>
        <article className="interview-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => <h1>{children}</h1>,
              h2: ({ children }) => <h2>{children}</h2>,
              h3: ({ children }) => <h3>{children}</h3>,
              p: ({ children }) => <p>{children}</p>,
              ul: ({ children }) => <ul>{children}</ul>,
              ol: ({ children }) => <ol>{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              br: () => <br />,
            }}
          >
            {typeof interview.body === "string" ? interview.body : ""}
          </ReactMarkdown>
        </article>
      </MarkdownErrorBoundary>
    </main>
  );
};

export default InterviewSelect;
