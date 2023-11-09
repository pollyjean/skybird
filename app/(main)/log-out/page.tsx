"use client";

import { postFetcher } from "@/utils";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

const Page = () => {
  const { data, isLoading } = useSWR("/api/user/logout", postFetcher);

  useEffect(() => {
    console.log(data, isLoading);
  }, [data, isLoading]);

  return <>{isLoading ? <h1>Log out</h1> : null}</>;
};
export default Page;
