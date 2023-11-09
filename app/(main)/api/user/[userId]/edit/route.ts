import client from "@/libs/server/client";
import { checkSessionUserId } from "@/libs/server/session";

export async function POST(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const sessionId = await checkSessionUserId(params.userId);

  if (!sessionId) {
    return new Response("", { status: 400 });
  }

  const { avatar } = await request.json();

  if (avatar) {
    await client.user.update({
      data: {
        avatar,
      },
      where: {
        id: +sessionId,
      },
    });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
