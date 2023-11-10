import bcrypt from "bcrypt";
import client from "@/libs/server/client";
import { getServerActionSession } from "@/libs/server/session";
import { handleErrors } from "@/utils";

export async function POST(request: Request) {
  const session = await getServerActionSession();
  const { email, username, password } = await request.json();

  let user = await client.user.findUnique({ where: { email } });

  if (user) {
    return new Response(
      JSON.stringify({
        message: { type: "email", value: "Account already exists" },
      }),
      {
        status: 400,
      },
    );
  }
  const textPassword = password;
  const protectedPassword = await bcrypt.hash(textPassword, 8);

  try {
    user = await client.user.create({
      data: {
        email,
        username,
        password: protectedPassword,
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
