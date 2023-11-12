"use client";

import { LikeValues, PageProps, TAIL, TweetFormValues } from "@/constants";
import { cls, postFetcherUserId } from "@/utils";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Like = ({ tweetId, userId }: PageProps) => {
  const [isLiked, setIsLiked] = useState<number | undefined>(undefined);
  const [value, setValue] = useState(0);
  const { data, mutate, isLoading, error } = useSWR<TweetFormValues>(
    `/tweet/${tweetId}/like/api`,
    postFetcherUserId,
  );
  const onClick = async () => {
    if (!isLoading) {
      setIsLiked(data?.userId);
      setValue((data?.likes as LikeValues[]).length);
      const local = {
        userId: !(data?.userId || undefined),
        likes: !!data?.userId
          ? (data?.likes as number) - 1
          : (data?.likes as number) + 1,
      };
      const update = async () =>
        await (
          await fetch(`/tweet/${tweetId}/like/add/api`, {
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
    <div className="flex justify-between border-y border-base-200 p-3">
      <p className="text-md font-light">
        <b className="font-normal">{data?.likes as number}</b> Likes
      </p>
      <button onClick={onClick} className="h-5 w-5">
        {isLoading ? (
          <span className="flex animate-spin items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </span>
        ) : (
          <>
            {data?.userId ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="orange"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            )}
          </>
        )}
      </button>
    </div>
  );
};

export default Like;
