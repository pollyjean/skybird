import bcrypt from "bcrypt";
import client from "@/libs/server/client";
import { getServerActionSession } from "@/libs/server/session";
import { handleErrors } from "@/utils";

export async function POST(request: Request) {
  const session = await getServerActionSession();
  const { email, password } = await request.json();

  let user = await client.user.findUnique({ where: { email } });

  if (!user) {
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  }
  const textPassword = password;
  const protectedPassword = user.password as string;

  try {
    const isEqual = await bcrypt.compare(textPassword, protectedPassword);
    if (isEqual) {
      session.user = {
        id: user.id,
        username: user.username || "anonymous",
        email: user.email,
      };
      await session.save();
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } else {
      return new Response(
        JSON.stringify({
          message: { type: password, value: "Password is incorrect" },
        }),
        { status: 400 },
      );
    }
  } catch (error: unknown) {
    return handleErrors(error);
  }
}
