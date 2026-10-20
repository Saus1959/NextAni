"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";

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
    <div className="flex justify-between items-end py-5 px-10">
      <div className="flex flex-col items-start gap-5">
        {hasDate && <p className="text-[13px] text-muted">{today}</p>}
        <h2 className="m-0 font-serif text-[34px] font-bold">{pageName}</h2>
      </div>
      <label className="flex h-11 w-75 items-center gap-2.5 rounded-md border-[1.5px] border-ink bg-card px-3.5 text-muted focus-within:border-accent">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="size-4 shrink-0" />
        <input
          type="search"
          placeholder="Search your anime"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
        />
      </label>
    </div>
  );
};

export default PageHeader;
