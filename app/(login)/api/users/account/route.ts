import bcrypt from "bcrypt";
import client from "@/libs/server/client";

export async function POST(request: Request) {
  const { email, username, password } = await request.json();

  let user = await client.user.findUnique({ where: { email } });

  if (user) {
    return new Response(JSON.stringify({ ok: false }), { status: 409 });
  }
  const textPassword = password;
  const protectedPassword = await bcrypt.hash(
    textPassword,
    process.env.SALT_ROUND || 3,
  );

  user = await client.user.create({
    data: {
      email,
      username,
      password: protectedPassword,
    },
  });
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
