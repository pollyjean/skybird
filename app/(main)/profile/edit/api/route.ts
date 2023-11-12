import client from "@/libs/server/client";
import { getServerActionSession } from "@/libs/server/session";
import { handleErrors } from "@/utils";

export async function POST(request: Request) {
  const session = await getServerActionSession();
  const { email, username, avatar, profile } = await request.json();

  try {
    const user = await client.user.upsert({
      where: { email },
      create: {
        email,
        avatar: avatar ? avatar : null,
        profile: profile ? profile : null,
      },
      update: {
        username: username,
        avatar,
        profile,
      },
    });
    session.user = {
      id: user.id,
      username: user.username || "anonymous",
      email: user.email,
    };
    await session.save();
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error: unknown) {
    return handleErrors(error);
  }
}
