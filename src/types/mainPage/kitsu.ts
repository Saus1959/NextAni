export interface KitsuItem {
  id: string;
  type: "anime" | "manga";
  attributes: {
    canonicalTitle: string;
    synopsis: string | null;
    averageRating: string | null; // "82.54", шкала 0–100
    startDate: string | null; // "2023-09-29"
    status: string;
    posterImage: { small: string; medium: string; large: string } | null;
    episodeCount?: number | null;
    chapterCount?: number | null;
  };
}

export interface KitsuList {
  data: KitsuItem[];
  links: { next?: string };
  meta: { count: number };
}

export interface Title {
  id: string;
  type: "anime" | "manga";
  title: string;
  poster: string | null;
  score: string | null; // "8.3"
  year: string | null;
}

export interface IProps {
  heading: string;
  data?: Title[];
  isLoading: boolean;
  isError: boolean;
}
