import { TAIL, TweetFormValues } from "@/constants";
import { cls, generateImageUrl } from "@/utils";
import client from "@/libs/server/client";
import { getServerActionSession } from "@/libs/server/session";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  const tweets = await client.tweet.findMany({ take: 10 });
  return (
    <>
      <h1 className={cls(TAIL.pageTitle)}>Skybird</h1>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id}>
            <Link href={`/tweet/${tweet.id}`} className="block">
              <h2>{tweet.authorId}</h2>
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
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Page;
