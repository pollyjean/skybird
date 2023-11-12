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

  try {
    const protectedPassword = await bcrypt.hash(textPassword, 8);
    user = await client.user.create({
      data: {
        email,
        username: username.length > 0 ? username : "anonymous",
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
