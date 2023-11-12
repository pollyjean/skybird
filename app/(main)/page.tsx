import { TAIL } from "@/constants";
import { cls } from "@/utils";
import { getAllTweets } from "@/libs/server/getAllTweets";
import Tweet from "@/components/Tweet";

const Page = async () => {
  const tweets = await getAllTweets();
  return (
    <section className="flex flex-col gap-5">
      <h1 className={cls(TAIL.pageTitle)}>Skybird</h1>
      <ul className="flex flex-col border-b-2 border-orange-light">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </ul>
    </section>
  );
};

export default Page;
