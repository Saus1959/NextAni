import React from "react";
import Link from "next/link";
import type { Title } from "../../types/mainPage/kitsu";

const AnimeCard = ({ title }: { title: Title }) => {
  const { id, type, title: name, poster, score, year } = title;

  return (
    <Link
      href={`/title/${id}?type=${type}`}
      className="group flex flex-col gap-1.5"
    >
      <div className="relative h-51 overflow-hidden rounded bg-ink/10">
        {poster && (
          <img
            src={poster}
            alt={name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <span className="absolute right-2 top-2 rounded-[3px] bg-paper px-1.75 py-0.75 text-xs font-semibold text-ink">
          {score ?? "—"}
        </span>
      </div>
      <b className="line-clamp-2 text-sm font-semibold leading-tight text-ink group-hover:text-accent">
        {name}
      </b>
      <span className="text-[13px] text-muted">{year ?? "—"}</span>
    </Link>
  );
};

export default AnimeCard;
