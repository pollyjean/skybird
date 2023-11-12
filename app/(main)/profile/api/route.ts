import client from "@/libs/server/client";
import { getServerActionSession } from "@/libs/server/session";
import { handleErrors } from "@/utils";

export async function POST() {
  const {
    user: { id },
  } = await getServerActionSession();

  if (!id) {
    return new Response("", { status: 400 });
  }
  try {
    const data = await client.user.findUnique({
      where: { id: +id },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        profile: true,
      },
    });

    return new Response(JSON.stringify({ data, ok: true }), { status: 200 });
  } catch (error: unknown) {
    return handleErrors(error);
  }
}
