"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import type { IProps, Title } from "@/types/mainPage/kitsu";
import AnimeCard from "../aniCard";

const AniSection = ({ heading, data, isLoading, isError }: IProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
    slidesToScroll: "auto",
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    update();
    emblaApi.on("select", update).on("reInit", update);
    return () => {
      emblaApi.off("select", update).off("reInit", update);
    };
  }, [emblaApi, update]);

  const btn =
    "absolute top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-md " +
    "border-[1.5px] border-ink bg-paper text-ink transition " +
    "hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-0";

  const unique: Title[] = data
    ? [...new Map<string, Title>(data.map((a) => [a.id, a])).values()]
    : [];

  return (
    <section className="flex flex-col min-w-0 gap-4 px-10">
      <div className="flex items-end justify-between">
        <h3 className="font-serif text-[22px] font-bold">{heading}</h3>
        <p className="border-b-[1.5px] border-accent text-sm font-semibold text-accent">
          All
        </p>
        {isError && <p className="text-muted">Не удалось загрузить</p>}
      </div>
      <div className="relative min-w-0">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="-ml-4 flex">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="min-w-0 flex-[0_0_165px] pl-4">
                    <div className="h-51 animate-pulse rounded bg-ink/10" />
                  </div>
                ))
              : unique.map((a) => (
                  <div key={a.id} className="min-w-0 flex-[0_0_165px] pl-4">
                    <AnimeCard title={a} />
                  </div>
                ))}
          </div>
        </div>

        <button
          className={`${btn} -left-3`}
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Назад"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="size-4" />
        </button>
        <button
          className={`${btn} -right-3`}
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="Вперёд"
        >
          <FontAwesomeIcon icon={faChevronRight} className="size-4" />
        </button>
      </div>
    </section>
  );
};

export default AniSection;
