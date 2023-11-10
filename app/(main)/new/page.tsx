import { TAIL } from "@/constants";
import { cls } from "@/utils";
import TweetForm from "./TweetForm";
import { getServerActionSession } from "@/libs/server/session";

const Page = async () => {
  const session = await getServerActionSession();
  return (
    <>
      <h1 className={cls(TAIL.pageTitle)}>New Post</h1>
      <TweetForm userId={session.user.id as number} />
    </>
  );
};

export default Page;
