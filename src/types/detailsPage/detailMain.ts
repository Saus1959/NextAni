export interface KitsuDetails {
  data: {
    id: string;
    type: "anime" | "manga";
    attributes: {
      canonicalTitle: string;
      titles?: { en?: string; en_jp?: string; ja_jp?: string };
      synopsis: string | null;
      averageRating: string | null;
      ratingRank?: number | null;
      startDate: string | null;
      endDate: string | null;
      status: string;
      subtype?: string | null;
      episodeCount?: number | null;
      chapterCount?: number | null;
      episodeLength?: number | null;
      ageRating?: string | null;
      ageRatingGuide?: string | null;
      youtubeVideoId?: string | null;
      posterImage: { small: string; large: string } | null;
    };
  };
  included?: { id: string; type: string; attributes: { name?: string } }[];
}
