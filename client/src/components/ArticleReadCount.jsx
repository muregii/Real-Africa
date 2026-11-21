import React from "react";

export default function ArticleReadCount({ count, className = "" }) {
  if (count == null) return null;

  return (
    <span className={`article-read-count ${className}`.trim()} aria-label={`${count.toLocaleString()} reads`}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span>{count.toLocaleString()} {count === 1 ? "read" : "reads"}</span>
    </span>
  );
}
