import client from "@/libs/server/client";
import { sealData } from "iron-session";

export async function POST(request: Request) {
  const { token } = await request.json();
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
    include: { user: true },
  });
  if (!exists) {
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  }
  const session = JSON.stringify(exists.user);
  const encryptedSession = await sealData(session, {
    password: process.env.COOKIE_PW || "",
  });
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Set-Cookie": `${process.env.COOKIE_NAME}=${encryptedSession}; path=/;`,
    },
  });
}
