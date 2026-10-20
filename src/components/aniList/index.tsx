"use client";
import React, { useEffect, useState, useMemo } from "react";
import AniSection from "../AniSection";
import useApi from "../../hook/useApi";
import { toTitle } from "../../Lib/mapTitle";
import type { KitsuList } from "../../types/mainPage/kitsu";

const TOP = "/anime?sort=-averageRating&page[limit]=20";
const SEASON =
  "/anime?filter[season]=fall&filter[seasonYear]=2026&sort=-userCount&page[limit]=20";
const MANGA = "/manga?sort=-userCount&page[limit]=20";

const AniList = () => {
  const top = useApi<KitsuList>(TOP);
  const season = useApi<KitsuList>(SEASON);
  const manga = useApi<KitsuList>(MANGA);

  const topItems = useMemo(() => top.data?.data.map(toTitle), [top.data]);
  const seasonItems = useMemo(
    () => season.data?.data.map(toTitle),
    [season.data],
  );
  const mangaItems = useMemo(() => manga.data?.data.map(toTitle), [manga.data]);

  return (
    <div className="flex min-w-0 flex-col gap-10">
      <AniSection
        heading="Top anime"
        data={topItems}
        isLoading={top.isLoading}
        isError={top.isError}
      />
      <AniSection
        heading="Anime of the Season"
        data={seasonItems}
        isLoading={season.isLoading}
        isError={season.isError}
      />
      <AniSection
        heading="Top manga"
        data={mangaItems}
        isLoading={manga.isLoading}
        isError={manga.isError}
      />
    </div>
  );
};

export default AniList;
