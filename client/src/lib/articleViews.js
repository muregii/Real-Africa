import { supabase } from "./supabase";

const pendingReads = new Map();

export const ARTICLE_VIEW_SLUGS = [
  "what-bigs-1-5-million-raise-means-for-africa",
  "scale-leadership-peter-nduati",
  "climate-innovation-uzoma-ayogu",
  "curiosity-to-inclusion-elly-savatia",
  "navigating-borders-g-o-ouma",
  "the-sleeping-giant-africa-food-imports",
];

export async function getArticleViewCounts(slugs) {
  if (!slugs.length) return {};

  const { data, error } = await supabase
    .from("article_view_counts")
    .select("slug, view_count")
    .in("slug", slugs);

  if (error) throw error;
  const counts = Object.fromEntries((data ?? []).map((row) => [row.slug, Number(row.view_count)]));
  return Object.fromEntries(slugs.map((slug) => [slug, counts[slug] ?? 0]));
}

export async function recordArticleRead(slug) {
  const sessionKey = `real-africa:article-read:${slug}`;
  let alreadyReadThisSession = false;

  try {
    alreadyReadThisSession = window.sessionStorage.getItem(sessionKey) === "1";
    if (!alreadyReadThisSession) window.sessionStorage.setItem(sessionKey, "1");
  } catch {
    // Continue counting if the browser blocks session storage.
  }

  if (!alreadyReadThisSession) {
    const request = supabase
      .rpc("record_article_read", { article_slug: slug })
      .then(({ data, error }) => {
        if (error) throw error;
        return Number(data);
      })
      .catch((error) => {
        try {
          window.sessionStorage.removeItem(sessionKey);
        } catch {
          // The count is unavailable until the database function is installed.
        }
        throw error;
      });

    pendingReads.set(slug, request);
    try {
      return await request;
    } finally {
      pendingReads.delete(slug);
    }
  }

  if (pendingReads.has(slug)) return pendingReads.get(slug);

  const counts = await getArticleViewCounts([slug]);
  return counts[slug] ?? 0;
}
