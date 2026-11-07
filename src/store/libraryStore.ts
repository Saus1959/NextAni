import { create } from "zustand";
import { persist } from "zustand/middleware";
import { KitsuDetails } from "../types/detailsPage/detailMain";
import { library } from "@fortawesome/fontawesome-svg-core";

export interface Title {
  id: string;
  type: "anime" | "manga";
  title: string;
  poster: string | null;
  score: string | null;
  year: string | null;
  status: string;
}

export interface LibraryStore {
  library: Title[];
  updateAniMangaStatus: (animangaObj: KitsuDetails, newStatus: string) => void;
}

const useLibraryStore = create<LibraryStore>()(
  persist(
    (set) => ({
      library: [],
      updateAniMangaStatus: (animangaObj, newStatus) => {
        const ani = animangaObj.data.attributes;

        const newTitle: Title = {
          id: animangaObj.data.id,
          type: animangaObj.data.type,
          title: ani.canonicalTitle,
          poster: ani.posterImage?.large || ani.posterImage?.small || null,
          score: ani.averageRating
            ? (Number(ani.averageRating) / 10).toFixed(1)
            : null,
          year: ani.startDate ? ani.startDate.slice(0, 4) : null,
          status: newStatus,
        };

        set((state) => {
          if (!animangaObj || !animangaObj.data || !animangaObj.data.id) {
            return state;
          }

          const isExist = state.library.find(
            (item) => item.id === animangaObj.data.id,
          );

          if (isExist) {
            return {
              library: state.library.map((item) =>
                item.id === animangaObj.data.id
                  ? { ...item, status: newStatus }
                  : item,
              ),
            };
          }

          return {
            library: [...state.library, newTitle],
          };
        });
      },
    }),
    { name: "library" },
  ),
);

export default useLibraryStore;
