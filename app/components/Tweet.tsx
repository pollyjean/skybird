import { ImageProps, LikeValues, TweetFormValues } from "@/constants";
import { convertLocalTime, generateImageUrl } from "@/utils";
import Image from "next/image";
import Link from "next/link";

interface TweetProps {
  tweet: TweetFormValues;
}

const Tweet = ({ tweet }: TweetProps) => {
  return (
    <li className="border-orange-right flex flex-col gap-5 border-t-2 border-orange-light py-5">
      {tweet.author && (
        <Link
          href={`/profile/${tweet?.authorId}`}
          className="flex cursor-pointer flex-col items-stretch gap-3 rounded-md p-5 hover:bg-base-100"
        >
          {tweet?.author?.username}
          <br />({tweet?.author?.email})
          {tweet?.author?.avatar && (
            <figure>
              <Image
                src={generateImageUrl(tweet.author.avatar, "profileImage")}
                alt={`${tweet.author.username}'s Avatar`}
                className="h-auto w-full"
                {...ImageProps}
              />
            </figure>
          )}
        </Link>
      )}

      <Link
        href={`/tweet/${tweet.id}`}
        className="flex cursor-pointer flex-col items-stretch gap-3 rounded-md p-5 hover:bg-base-100"
      >
        <p>{tweet?.text}</p>
        {tweet.image && (
          <figure>
            <Image
              src={generateImageUrl(tweet.image, "tweetImage")}
              alt="Post Image"
              {...ImageProps}
            />
          </figure>
        )}
        <p>
          {typeof tweet?.likes === "number"
            ? tweet.likes
            : tweet?.likes?.length}
        </p>
        <aside>{convertLocalTime(tweet?.createdAt as Date)}</aside>
      </Link>
    </li>
  );
};

export default Tweet;
