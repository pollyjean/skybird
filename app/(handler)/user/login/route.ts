import bcrypt from "bcrypt";
import client from "@/libs/server/client";
import { getServerActionSession } from "@/libs/server/session";

export async function POST(request: Request) {
  const session = await getServerActionSession();
  const { email, password } = await request.json();

  let user = await client.user.findUnique({ where: { email } });

  if (!user) {
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  }
  const textPassword = password;
  const protectedPassword = user.password as string;

  bcrypt.compare(textPassword, protectedPassword, async (error, result) => {
    if (error) {
      console.error(error);
      return new Response("", { status: 400 });
    }
    if (result) {
      session.user = {
        id: user?.id || 0,
        username: user?.username || "anonymous",
        email: user?.email || "",
      };
      await session.save();
    }
  });
  if (session.user.id) {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  }
}
