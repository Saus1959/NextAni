import type { KitsuItem, Title } from "../types/mainPage/kitsu";

export const toTitle = (item: KitsuItem): Title => {
  const a = item.attributes;
  return {
    id: item.id,
    type: item.type,
    title: a.canonicalTitle,
    poster: a.posterImage?.small ?? null,
    score: a.averageRating ? (Number(a.averageRating) / 10).toFixed(1) : null,
    year: a.startDate ? a.startDate.slice(0, 4) : null,
  };
};
