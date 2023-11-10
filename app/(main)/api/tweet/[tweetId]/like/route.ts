import client from "@/libs/server/client";
import { getServerActionSession } from "@/libs/server/session";
import { handleErrors } from "@/utils";

export async function POST(
  request: Request,
  { params }: { params: { tweetId: string } },
) {
  const { tweetId } = params;
  const session = await getServerActionSession();

  try {
    const likes = await client.like.count({
      where: {
        tweetId: +tweetId,
      },
    });

    const existLike = await client.like.findFirst({
      where: {
        AND: [{ tweetId: +tweetId }, { userId: +session.user.id }],
      },
    });

    if (existLike) {
      return new Response(JSON.stringify({ likes, userId: session.user.id }), {
        status: 200,
      });
    }

    return new Response(JSON.stringify({ likes }), { status: 200 });
  } catch (error: unknown) {
    return handleErrors(error);
  }
}
