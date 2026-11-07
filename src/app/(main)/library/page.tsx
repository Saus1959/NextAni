"use client";
import { Suspense } from "react";
import AnimeCard from "../../../components/aniCard";
import MyLibNav from "../../../components/MyLibNav";
import PageHeader from "../../../components/PageHeader";
import useLibraryStore from "../../../store/libraryStore";
import { useSearchParams } from "next/navigation";

const LibraryContent = () => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("status") || "all";
  const libStore = useLibraryStore((state) => state.library);

  const filteredLib =
    currentTab === "all"
      ? libStore
      : libStore.filter((a) => a.status === currentTab);

  return (
    <div className="px-4 py-3 sm:px-6 sm:py-5 lg:px-10">
      <MyLibNav />
      <div className="grid grid-cols-2 gap-x-3 gap-y-7 py-6 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-10 sm:py-10 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredLib.length > 0 &&
          filteredLib.map((animanga) => {
            return <AnimeCard title={animanga} key={animanga.id} />;
          })}
      </div>
    </div>
  );
};

const Library = () => {
  return (
    <div>
      <PageHeader pageName="My Library" />
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <LibraryContent />
      </Suspense>
    </div>
  );
};

export default Library;
