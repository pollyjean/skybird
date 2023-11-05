import bcrypt from "bcrypt";
import client from "@/libs/server/client";

export async function POST(request: Request) {
  const { email, username, password } = await request.json();

  let user = await client.user.findUnique({ where: { email } });

  if (user) {
    return new Response(JSON.stringify({ ok: false }), { status: 409 });
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
  } catch (error) {
    console.error(error);
    return new Response("", { status: 503 });
  }
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
