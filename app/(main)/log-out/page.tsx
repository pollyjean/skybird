"use client";

import { TAIL } from "@/constants";
import { cls, postFetcher } from "@/utils";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

const Page = () => {
  const { data, isLoading } = useSWR("/log-out/api", postFetcher);

  useEffect(() => {
    if (!isLoading && data?.ok) {
      redirect("/log-in");
    }
  }, [data, isLoading]);

  return (
    <>
      {isLoading ? <h1 className={cls(TAIL.pageTitle)}>Loading...</h1> : null}
    </>
  );
};
export default Page;
