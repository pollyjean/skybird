import { getServerActionSession } from "@/libs/server/session";
import ProfileForm from "./ProfileForm";

const Page = async () => {
  const {
    user: { id },
  } = await getServerActionSession();
  return (
    <main>
      <ProfileForm sessionId={id} />
    </main>
  );
};
export default Page;
