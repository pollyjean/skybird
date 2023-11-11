import { TAIL } from "@/constants";
import { cls, convertLocalTime, generateImageUrl } from "@/utils";
import client from "@/libs/server/client";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
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
  return (
    <section className="flex flex-col gap-5">
      <h1 className={cls(TAIL.pageTitle)}>Skybird</h1>
      <ul className="flex flex-col border-b-2 border-orange-light">
        {tweets.map((tweet) => (
          <li
            key={tweet.id}
            className="border-orange-right flex flex-col gap-5 border-t-2 border-orange-light py-5"
          >
            <Link
              href={`/profile/${tweet?.authorId}`}
              className="flex cursor-pointer flex-col items-stretch gap-3 rounded-md p-5 hover:bg-base-100"
            >
              {tweet?.author.username}
              <br />({tweet?.author.email})
              {tweet?.author.avatar && (
                <figure>
                  <Image
                    src={generateImageUrl(tweet.author.avatar)}
                    alt={`${tweet.author.username}'s Avatar`}
                    width={536}
                    height={536}
                    className="w-full"
                  />
                </figure>
              )}
            </Link>
            <Link
              href={`/tweet/${tweet.id}`}
              className="flex cursor-pointer flex-col items-stretch gap-3 rounded-md p-5 hover:bg-base-100"
            >
              <p>{tweet?.text}</p>
              {tweet.image && (
                <figure>
                  <Image
                    src={generateImageUrl(tweet.image)}
                    alt="Post Image"
                    width={250}
                    height={250}
                    priority={true}
                  />
                </figure>
              )}
              <p>{tweet.likes.length} Likes</p>
              <aside>{convertLocalTime(tweet?.createdAt as Date)}</aside>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Page;
