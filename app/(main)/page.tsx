import { TAIL, TweetFormValues } from "@/constants";
import { cls, generateImageUrl } from "@/utils";
import client from "@/libs/server/client";
import { getServerActionSession } from "@/libs/server/session";
import Image from "next/image";

const Page = async () => {
  const tweets = await client.tweet.findMany({ take: 10 });
  console.log(tweets);
  return (
    <>
      <h1 className={cls(TAIL.pageTitle)}>Skybird</h1>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id}>
            <h2>{tweet.authorId}</h2>
            <p>{tweet?.text}</p>
            {tweet.image && (
              <figure>
                <Image
                  src={generateImageUrl(tweet.image)}
                  alt="Post Image"
                  width={350}
                  height={250}
                />
              </figure>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Page;
