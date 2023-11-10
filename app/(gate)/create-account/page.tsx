import { cls } from "@/utils";
import AccountForm from "./AccountForm";
import Link from "next/link";
import { TAIL } from "@/constants";

const Page = () => {
  return (
    <>
      <h1 className={cls(TAIL.pageTitle)}>Create Account</h1>
      <AccountForm />
      <Link href="/log-in" className={cls(TAIL.textLink)}>
        Have an account? Log in here &rarr;
      </Link>
    </>
  );
};
export default Page;
