import Link from "next/link";
import LoginForm from "./LoginForm";
import { cls } from "@/utils";
import { TAIL } from "@/constants";

const Page = async () => {
  return (
    <>
      <h1 className={cls(TAIL.pageTitle)}>Login</h1>
      <LoginForm />
      <Link href="/create-account" className={cls(TAIL.textLink)}>
        Have no account? create account &rarr;
      </Link>
    </>
  );
};

export default Page;
