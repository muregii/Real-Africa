-- Public article read counts. Readers can see totals and increment a published
-- article's count through the narrowly scoped RPC, but cannot edit totals.
create table if not exists public.article_view_counts (
  slug text primary key check (
    slug in (
      'what-bigs-1-5-million-raise-means-for-africa',
      'scale-leadership-peter-nduati',
      'climate-innovation-uzoma-ayogu',
      'curiosity-to-inclusion-elly-savatia',
      'navigating-borders-g-o-ouma',
      'the-sleeping-giant-africa-food-imports'
    )
  ),
  view_count bigint not null default 0 check (view_count >= 0),
  updated_at timestamptz not null default now()
);

alter table public.article_view_counts enable row level security;

drop policy if exists "Anyone can read article view counts" on public.article_view_counts;
create policy "Anyone can read article view counts"
  on public.article_view_counts
  for select
  to anon, authenticated
  using (true);

grant select on public.article_view_counts to anon, authenticated;
revoke insert, update, delete, truncate, references, trigger
  on public.article_view_counts from anon, authenticated;

create or replace function public.record_article_read(article_slug text)
returns bigint
language sql
security definer
set search_path = ''
as $$
  insert into public.article_view_counts as counts (slug, view_count)
  values (article_slug, 1)
  on conflict (slug) do update
    set view_count = counts.view_count + 1,
        updated_at = pg_catalog.now()
  returning view_count;
$$;

revoke all on function public.record_article_read(text) from public;
revoke all on function public.record_article_read(text) from anon, authenticated;
grant execute on function public.record_article_read(text) to anon, authenticated;
