import client from "@/libs/server/client";
import { sealData } from "iron-session";

export async function POST(request: Request) {
  const { token } = await request.json();
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
    include: { user: true },
  });

  if (!foundToken) {
    return new Response(JSON.stringify({ ok: false }), { status: 401 });
  } else {
    const session = JSON.stringify(foundToken.user);
    const encryptedSession = await sealData(session, {
      password: process.env.COOKIE_PW || "",
    });
    await client.token.deleteMany({
      where: { userId: foundToken.userId },
    });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        "Set-Cookie": `${process.env.COOKIE_NAME}=${encryptedSession}; path=/;`,
      },
    });
  }
}
