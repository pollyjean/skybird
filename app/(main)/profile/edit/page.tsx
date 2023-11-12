import Link from "next/link";
import ProfileForm from "./ProfileForm";
import { cls } from "@/utils";
import { TAIL } from "@/constants";

const Page = async () => {
  return (
    <main>
      <h1 className={cls(TAIL.pageTitle)}>Profile Edit</h1>
      <ProfileForm />
      <Link href="/profile/password">Edit Password &rarr;</Link>
    </main>
  );
};
export default Page;
