"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const PageHeader = ({
  pageName,
  hasDate = false,
}: {
  pageName: string;
  hasDate?: boolean;
}) => {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-EN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, []);

  return (
    <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:px-6 sm:py-5 lg:px-10">
      <div className="flex min-w-0 flex-col items-start gap-2 sm:gap-5">
        {hasDate && <p className="text-[13px] text-muted">{today}</p>}
        <h2 className="m-0 font-serif text-[28px] font-bold leading-tight sm:text-[34px]">
          {pageName}
        </h2>
      </div>
      <label className="flex h-11 w-full shrink-0 items-center gap-2.5 sm:w-64 lg:w-75 rounded-md border-[1.5px] border-ink bg-card px-3.5 text-muted focus-within:border-accent">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="size-4 shrink-0" />
        <input
          type="search"
          placeholder="Search your anime"
          className="w-full min-w-0 bg-transparent text-base text-ink outline-none placeholder:text-muted sm:text-sm"
        />
      </label>
    </div>
  );
};

export default PageHeader;
