import { TAIL } from "@/constants";
import { cls, generateImageUrl } from "@/utils";
import client from "@/libs/server/client";
import { getServerActionSession } from "@/libs/server/session";
import Image from "next/image";

const Page = async ({ params }: { params: { tweetId: string } }) => {
  const session = await getServerActionSession();
  const tweet = await client.tweet.findUnique({
    where: { id: +params.tweetId },
  });
  console.log(tweet);
  return (
    <>
      <h1 className={cls(TAIL.pageTitle)}>Post View</h1>
      <p>{tweet?.text}</p>
      {tweet?.image ? (
        <figure>
          <Image
            src={generateImageUrl(tweet.image)}
            alt="Post Image"
            width={350}
            height={250}
          />
        </figure>
      ) : null}
    </>
  );
};

export default Page;
