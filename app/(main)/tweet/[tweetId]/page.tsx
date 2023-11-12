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
    <section>
      <h1 className={cls(TAIL.pageTitle)}>Tweet</h1>
      <h2>
        <Link href={`/profile/${tweet?.authorId}`}>
          {tweet?.author.username}({tweet?.author.email})
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
      </h2>
      <p>{tweet?.text}</p>
      {tweet?.image ? (
        <figure>
          <Image
            src={generateImageUrl(tweet.image, "tweetImage")}
            alt="Post Image"
            className="h-auto w-full"
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
