import Link from "next/link";
import PasswordForm from "./PasswordForm";
import { cls } from "@/utils";
import { TAIL } from "@/constants";

const Page = async () => {
  return (
    <main>
      <h1 className={cls(TAIL.pageTitle)}>Password Change</h1>
      <PasswordForm />
      <Link href="/profile/edit">Edit Profile &rarr;</Link>
    </main>
  );
};
export default Page;
