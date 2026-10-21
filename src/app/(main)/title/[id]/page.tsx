"use client";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import useApi from "../../../../hook/useApi";
import { KitsuDetails } from "../../../../types/detailsPage/detailMain";
import AniTrailer from "../../../../components/AniTrailer";
import MangaReadSection from "../../../../components/MangaReadSection";

const RELEASE_STATUS: Record<string, string> = {
  finished: "Finished",
  current: "Airing",
  upcoming: "Upcoming",
  tba: "Announced",
  unreleased: "Unreleased",
};

const fmt = (d?: string | null) =>
  d
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
      }).format(new Date(d))
    : null;

function DetailsContent() {
  const { id } = useParams<{ id: string }>();
  const type = useSearchParams().get("type") === "manga" ? "manga" : "anime";

  const { data, isLoading, isError } = useApi<KitsuDetails>(
    `/${type}/${id}?include=genres`,
  );

  if (isLoading) {
    return (
      <div className="flex gap-10 px-10 py-9">
        <div className="h-100 w-70 shrink-0 animate-pulse rounded bg-ink/10" />
        <div className="flex flex-1 flex-col gap-4">
          <div className="h-4 w-40 animate-pulse rounded bg-ink/10" />
          <div className="h-11 w-2/3 animate-pulse rounded bg-ink/10" />
          <div className="h-28 animate-pulse rounded bg-ink/10" />
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-start gap-4 px-10 py-9">
        <p className="text-muted">Failed to load this title.</p>
        <Link href="/" className="text-accent underline">
          Back to home
        </Link>
      </div>
    );
  }

  const a = data.data.attributes;
  const genres = (data.included ?? [])
    .filter((i) => i.type === "genres")
    .map((i) => i.attributes.name)
    .filter(Boolean) as string[];

  const score = a.averageRating
    ? (Number(a.averageRating) / 10).toFixed(1)
    : null;
  const year = a.startDate?.slice(0, 4);
  const total = a.episodeCount ?? a.chapterCount ?? null;
  const unitLabel = type === "anime" ? "Episodes" : "Chapters";
  const period = [fmt(a.startDate), fmt(a.endDate)].filter(Boolean).join(" — ");
  const subtitle = a.titles?.ja_jp ?? a.titles?.en_jp;

  const facts = (
    [
      ["Type", a.subtype?.toUpperCase()],
      ["Status", RELEASE_STATUS[a.status] ?? a.status],
      [unitLabel, total],
      ["Duration", a.episodeLength ? `${a.episodeLength} min` : null],
      ["Aired", period || null],
      [
        "Age rating",
        a.ageRating
          ? `${a.ageRating}${a.ageRatingGuide ? ` · ${a.ageRatingGuide}` : ""}`
          : null,
      ],
    ] as [string, string | number | null | undefined][]
  ).filter((f): f is [string, string | number] => f[1] != null && f[1] !== "");

  return (
    <div className="flex min-w-0 flex-col gap-7 px-10 py-9">
      <Link href="/" className="self-start text-muted hover:text-accent">
        ← Back
      </Link>
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="relative h-100 w-70 shrink-0 overflow-hidden rounded bg-ink/10">
          {a.posterImage?.large && (
            <img
              src={a.posterImage.large}
              alt={a.canonicalTitle}
              className="size-full object-cover"
            />
          )}
          {score && (
            <span className="absolute right-3 top-3 rounded-[3px] bg-paper px-2.25 py-1 text-sm font-semibold text-ink">
              {score}
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4.5">
          <div className="flex items-center gap-2.5 text-[13px] text-muted">
            <span
              className={`size-2 rounded-full ${a.status === "finished" ? "bg-[#3F6B5A]" : "bg-accent"}`}
            />
            {[
              RELEASE_STATUS[a.status],
              a.subtype?.toUpperCase(),
              total && `${total} ${type === "anime" ? "ep." : "ch."}`,
              year,
            ]
              .filter(Boolean)
              .join(" · ")}
          </div>

          <div>
            <h1 className="font-serif text-[44px] font-bold leading-[1.05]">
              {a.canonicalTitle}
            </h1>
            {subtitle && (
              <div className="mt-2 text-[15px] text-muted">{subtitle}</div>
            )}
          </div>

          {score && (
            <div className="flex items-center gap-1.5 text-[15px]">
              <span className="text-accent">★</span>
              <b className="font-semibold">{score}</b>
              <span className="text-muted">/ 10</span>
              {a.ratingRank && (
                <span className="ml-5 text-muted">Rank: #{a.ratingRank}</span>
              )}
            </div>
          )}

          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <span
                  key={g}
                  className="rounded-full border-[1.5px] border-ink px-3 py-1 text-[13px]"
                >
                  {g}
                </span>
              ))}
            </div>
          )}

          <p className="max-w-155 text-[15px] leading-relaxed text-[#3A372F]">
            {a.synopsis ?? "No synopsis available yet."}
          </p>

          {a.youtubeVideoId && (
            <div className="mt-auto">
              <a
                href="#trailer"
                className="inline-flex h-12 items-center rounded-md bg-ink px-5.5 text-[15px] font-semibold text-paper no-underline transition hover:bg-accent"
              >
                Watch trailer
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {type === "anime" || a.youtubeVideoId ? (
          <AniTrailer
            trailerTitle={a.canonicalTitle}
            trailerYtId={a.youtubeVideoId}
          />
        ) : (
          <MangaReadSection title={a.canonicalTitle} />
        )}

        <section className="flex flex-col gap-3.5 lg:col-start-2">
          <h2 className="font-serif text-[22px] font-bold">Information</h2>
          <dl className="rounded-md border-[1.5px] border-ink bg-card px-4.5 py-1.5">
            {facts.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between gap-4 border-b border-[#DDD7C8] py-3 text-sm last:border-0"
              >
                <dt className="text-muted">{label}</dt>
                <dd className="text-right font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}

const DetailsPage = () => (
  <Suspense fallback={null}>
    <DetailsContent />
  </Suspense>
);

export default DetailsPage;
