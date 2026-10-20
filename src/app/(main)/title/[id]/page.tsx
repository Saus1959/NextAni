"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";
import useApi from "../../../../hook/useApi";
import { KitsuList } from "../../../../types/mainPage/kitsu";

const DetailsPage = () => {
  const {
    id,
  }: {
    id: string;
  } = useParams();

  const selectedAni = useApi<KitsuList>(id);

  return (
    <div className="px-9 py-10">
      <Link href="/" className="text-md text-muted hover:text-accent">
        Back
      </Link>
    </div>
  );
};

export default DetailsPage;
