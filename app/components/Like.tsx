"use client";

import { PageProps, TweetFormValues } from "@/constants";
import { postFetcherUserId } from "@/utils";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Like = ({ tweetId, userId }: PageProps) => {
  const [isLiked, setIsLiked] = useState<string | undefined>("");
  const [value, setValue] = useState(0);
  const { data, mutate, isLoading, error } = useSWR<TweetFormValues>(
    `/api/tweet/${tweetId}/like`,
    postFetcherUserId,
  );
  const onClick = async () => {
    if (!isLoading) {
      setIsLiked(data?.userId);
      setValue(data?.likes as number);
      const local = {
        userId: !(data?.userId || undefined),
        likes: !!data?.userId
          ? (data?.likes as number) - 1
          : (data?.likes as number) + 1,
      };
      const update = async () =>
        await (
          await fetch(`/api/tweet/${tweetId}/like/add`, {
            method: "POST",
            body: JSON.stringify({ userId: userId }),
          })
        ).json();
      mutate(update, {
        optimisticData: local as any,
        revalidate: true,
      });
    }
  };
  useEffect(() => {
    if (!isLoading && !!isLiked === false && value === 0) {
      setIsLiked(data?.userId);
      setValue(data?.likes as number);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLiked, value, isLoading]);
  if (error) console.error(error);
  return (
    <>
      <span>{data?.likes}</span>
      <button onClick={onClick}>
        {isLoading ? "Loading..." : <>{data?.userId ? "Unlike" : "Like"}</>}
      </button>
    </>
  );
};

export default Like;
