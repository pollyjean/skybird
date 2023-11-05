import { redirect } from "next/navigation";
import client from "@/libs/server/client";
import LoginForm from "./LoginForm";

const Page = async () => {
  const exist = await client.user.findMany();
  if (exist.length === 0) {
    redirect("/create-account");
  }
  return (
    <main>
      <LoginForm />
    </main>
  );
};

export default Page;
