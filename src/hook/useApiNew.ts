"use client";
import { useEffect, useState } from "react";
import { api } from "../Lib/api";

const LIMIT = 20;

const useApiNew = <T>(type: "anime" | "manga", total: number) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setIsError(false);

    const pages = Math.ceil(total / LIMIT);

    Promise.all(
      Array.from({ length: pages }, (_, i) =>
        api.get<{ data: T[] }>(`/${type}`, {
          signal: controller.signal,
          params: {
            "page[limit]": LIMIT,
            "page[offset]": i * LIMIT,
            sort: "popularityRank",
          },
        }),
      ),
    )
      .then((results) =>
        setData(results.flatMap((r) => r.data.data).slice(0, total)),
      )
      .catch((err) => {
        if (!controller.signal.aborted) setIsError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [type, total]);

  return { data, isLoading, isError };
};

export default useApiNew;
