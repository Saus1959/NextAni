"use client";
import { useEffect, useState } from "react";
import { api } from "../Lib/api";

const useApi = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setIsError(false);

    api
      .get<T>(url, { signal: controller.signal })
      .then((res) => setData(res.data))
      .catch((err) => {
        if (!controller.signal.aborted) setIsError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [url]);

  return { data, isLoading, isError };
};

export default useApi;
