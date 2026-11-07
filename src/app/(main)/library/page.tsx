"use client";
import AnimeCard from "../../../components/aniCard";
import MyLibNav from "../../../components/MyLibNav";
import PageHeader from "../../../components/PageHeader";
import useLibraryStore from "../../../store/libraryStore";
import { TLibNavArr } from "../../../types/libraryPage/myLibNav";
import { useSearchParams } from "next/navigation";

const Library = () => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("status") || "all";
  const libStore = useLibraryStore((state) => state.library);
  console.log(libStore);

  const filteredLib =
    currentTab === "all"
      ? libStore
      : libStore.filter((a) => a.status === currentTab);

  return (
    <div>
      <PageHeader pageName="My Library" />
      <div className="px-4 py-3 sm:px-6 sm:py-5 lg:px-10">
        <MyLibNav />
        <div className="grid grid-cols-2 gap-x-3 gap-y-7 py-6 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-10 sm:py-10 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredLib.length > 0 &&
            filteredLib.map((animanga) => {
              return <AnimeCard title={animanga} key={animanga.id} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default Library;
