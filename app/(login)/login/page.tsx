import { redirect } from "next/navigation";
import client from "@/libs/server/client";

const Page = async () => {
  const exist = await client.user.findMany();
  if (exist.length === 0) {
    redirect("/create-account");
  }
  return <div>Enter</div>;
};

export default Page;
