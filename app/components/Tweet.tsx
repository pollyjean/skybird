import { ImageProps, LikeValues, TweetFormValues } from "@/constants";
import { convertLocalTime, generateImageUrl } from "@/utils";
import Image from "next/image";
import Link from "next/link";

interface TweetProps {
  tweet: TweetFormValues;
}

const Tweet = ({ tweet }: TweetProps) => {
  return (
    <li className="border-orange-right flex flex-col gap-3 border-t-2 border-orange-light py-5">
      {tweet.author && (
        <h3 className="grid grid-cols-2">
          <Link
            href={"/profile/" + tweet?.authorId}
            className="flex cursor-pointer items-center justify-between gap-3 rounded-3xl border border-base-300 p-2.5 text-center  hover:bg-base-100"
          >
            <span>
              {tweet?.author?.username}
              <b>({tweet?.author?.email})</b>
            </span>
            {tweet?.author?.avatar && (
              <figure className="h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={generateImageUrl(tweet.author.avatar, "profileImage")}
                  alt={`${tweet.author.username}'s Avatar`}
                  className="h-auto w-full"
                  {...ImageProps}
                />
              </figure>
            )}
          </Link>
        </h3>
      )}

      <Link
        href={`/tweet/${tweet.id}`}
        className="flex cursor-pointer flex-col items-stretch gap-3 rounded-md bg-base-50 p-5 hover:bg-base-100"
      >
        <p className="text-xl">{tweet?.text}</p>
        {tweet.image && (
          <figure>
            <Image
              src={generateImageUrl(tweet.image, "tweetImage")}
              alt="Post Image"
              className="my-5 rounded-xl"
              {...ImageProps}
            />
          </figure>
        )}
        <p className="text-md border-y border-base-200 p-3 font-light">
          <b className="font-normal">
            {typeof tweet?.likes === "number"
              ? tweet.likes
              : tweet?.likes?.length}
          </b>
          Likes
        </p>
        <aside className="text-sm">
          {convertLocalTime(tweet?.createdAt as Date)}
        </aside>
      </Link>
    </li>
  );
};

export default Tweet;
