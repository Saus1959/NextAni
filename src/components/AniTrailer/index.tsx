import React from "react";

const AniTrailer = ({
  trailerYtId,
  trailerTitle,
}: {
  trailerYtId?: string | null;
  trailerTitle: string;
}) => {
  return (
    <section id="trailer" className="flex scroll-mt-6 flex-col gap-3.5">
      <h2 className="font-serif text-[22px] font-bold">Trailer</h2>
      <div className="aspect-video overflow-hidden rounded-md bg-ink">
        <iframe
          src={`https://www.youtube.com/embed/${trailerYtId}`}
          title={`Trailer: ${trailerTitle}`}
          allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="size-full"
        />
      </div>
    </section>
  );
};

export default AniTrailer;
