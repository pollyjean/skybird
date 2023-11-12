import client from "./client";
import { unstable_noStore as noStore } from "next/cache";

export const getAllTweets = async () => {
  noStore();
  const tweets = await client.tweet.findMany({
    include: {
      likes: true,
      author: {
        select: {
          id: true,
          email: true,
          username: true,
          avatar: true,
        },
      },
    },
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
  return tweets;
};
