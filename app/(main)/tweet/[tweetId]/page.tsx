import { ImageProps, TAIL } from "@/constants";
import { cls, convertLocalTime, generateImageUrl } from "@/utils";
import client from "@/libs/server/client";
import { getServerActionSession } from "@/libs/server/session";
import Image from "next/image";
import Link from "next/link";
import Like from "@/components/Like";

const Page = async ({ params }: { params: { tweetId: string } }) => {
  const session = await getServerActionSession();
  const tweet = await client.tweet.findUnique({
    where: { id: +params.tweetId },
    include: {
      author: {
        select: {
          username: true,
          email: true,
          avatar: true,
        },
      },
      likes: true,
    },
  });

  return (
    <section className="flex flex-col gap-3">
      <h1 className={cls(TAIL.pageTitle)}>Tweet</h1>
      <h3 className="grid grid-cols-3">
        <Link
          href={`/profile/${tweet?.authorId}`}
          className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border border-base-300 p-2.5 text-center hover:bg-base-100"
        >
          <span>
            <b>{tweet?.author.username}</b> ({tweet?.author.email})
          </span>
          {tweet?.author.avatar && (
            <figure>
              <Image
                src={generateImageUrl(tweet.author.avatar, "profileImage")}
                alt={`${tweet.author.username}'s Avatar`}
                {...ImageProps}
              />
            </figure>
          )}
        </Link>
      </h3>
      <p className="text-xl">{tweet?.text}</p>
      {tweet?.image ? (
        <figure>
          <Image
            src={generateImageUrl(tweet.image, "tweetImage")}
            alt="Post Image"
            className="my-5 h-auto w-full rounded-xl"
            {...ImageProps}
          />
        </figure>
      ) : null}
      <Like tweetId={+params.tweetId} userId={session.user.id} />
      <aside>{convertLocalTime(tweet?.createdAt as Date)}</aside>
    </section>
  );
};

export default Page;
