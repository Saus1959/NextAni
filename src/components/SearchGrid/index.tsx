import { useMemo, useState } from "react";
import { KitsuItem, KitsuList } from "../../types/mainPage/kitsu";
import useApiNew from "../../hook/useApiNew";
import AnimeCard from "../aniCard";
import { toTitle } from "../../Lib/mapTitle";

const SearchGrid = ({ inpVal }: { inpVal: string }) => {
  const { data, isLoading, isError } = useApiNew<KitsuItem>("anime", 150);

  const titles = useMemo(() => data.map(toTitle), [data]);

  const filteredTitles = titles.filter((t) =>
    t.title.toLowerCase().includes(inpVal.toLowerCase()),
  );

  if (isLoading) return <p className="py-6">Loading...</p>;
  if (isError) return <p className="py-6">Something went wrong.</p>;

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-7 py-6 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-10 sm:py-10 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mx-4 sm:mx-6 md:mx-0 md:mr-3 lg:mr-10">
      {filteredTitles.map((t) => (
        <AnimeCard title={t} key={t.id} />
      ))}
    </div>
  );
};

export default SearchGrid;
