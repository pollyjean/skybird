import { TAIL } from "@/constants";
import { cls } from "@/utils";
import TweetForm from "./TweetForm";

const Page = async () => {
  return (
    <>
      <h1 className={cls(TAIL.pageTitle)}>New Post</h1>
      <TweetForm />
    </>
  );
};

export default Page;
