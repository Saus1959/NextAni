import React from "react";
import { MangaReadSectionProps } from "../../types/detailsPage/detailMain";

const SERVICES: { name: string; url: (title: string) => string }[] = [
  {
    name: "MangaDex",
    url: (t) => `https://mangadex.org/search?q=${encodeURIComponent(t)}`,
  },
];

const MangaReadSection = ({ title }: MangaReadSectionProps) => {
  return (
    <section id="read" className="flex scroll-mt-6 flex-col gap-3.5">
      <h2 className="font-serif text-[22px] font-bold">Read online</h2>

      <div className="flex flex-col gap-4 rounded-md border-[1.5px] border-ink bg-card p-6">
        <p className="max-w-md text-[15px] leading-relaxed text-muted">
          Chapters aren&apos;t hosted here. Open this title on another service
          to start reading.
        </p>

        <div className="flex flex-wrap gap-3">
          {SERVICES.map(({ name, url }) => (
            <a
              key={name}
              href={url(title)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-ink px-5.5 text-[15px] font-semibold text-paper no-underline transition hover:bg-accent"
            >
              Read on {name}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MangaReadSection;
