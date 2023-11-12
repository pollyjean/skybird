import { getServerActionSession } from "@/libs/server/session";
import ProfileForm from "./ProfileForm";
import { cls } from "@/utils";
import { TAIL } from "@/constants";

const Page = async () => {
  const {
    user: { id },
  } = await getServerActionSession();
  return (
    <main>
      <h1 className={cls(TAIL.pageTitle)}>Profile Edit</h1>
      <ProfileForm />
    </main>
  );
};
export default Page;
