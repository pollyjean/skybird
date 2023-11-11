import { TAIL } from "@/constants";
import { cls, generateImageUrl } from "@/utils";
import client from "@/libs/server/client";
import { getServerActionSession } from "@/libs/server/session";
import Image from "next/image";

const Page = async () => {
  const session = await getServerActionSession();
  const user = await client.user.findUnique({
    where: { id: +session.user.id },
  });

  return (
    <section>
      <h1 className={cls(TAIL.pageTitle)}>Profile</h1>
      <h2>
        {user?.username}({user?.email})
        {user?.avatar && (
          <figure>
            <Image
              src={generateImageUrl(user.avatar)}
              alt={`${user.username}'s Avatar`}
              width={100}
              height={100}
            />
          </figure>
        )}
      </h2>
    </section>
  );
};

export default Page;
