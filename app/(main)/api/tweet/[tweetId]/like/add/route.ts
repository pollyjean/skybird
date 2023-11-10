import client from "@/libs/server/client";
import { handleErrors } from "@/utils";

export async function POST(
  request: Request,
  { params }: { params: { tweetId: string } },
) {
  const { tweetId } = params;
  const { userId } = await request.json();
  try {
    const existLike = await client.like.findFirst({
      where: {
        AND: [{ tweetId: +tweetId }, { userId: +userId }],
      },
    });

    const likes = await client.like.count({
      where: {
        tweetId: +tweetId,
      },
    });

    if (existLike) {
      await client.like.deleteMany({
        where: {
          AND: [{ tweetId: +tweetId }, { userId: +userId }],
        },
      });

      return new Response(
        JSON.stringify({ likes: likes - 1, userId: undefined }),
        {
          status: 200,
        },
      );
    } else {
      await client.like.create({
        data: {
          tweetId: +tweetId,
          userId: +userId,
        },
      });

      return new Response(JSON.stringify({ likes: likes + 1, userId }), {
        status: 200,
      });
    }
  } catch (error: unknown) {
    return handleErrors(error);
  }
}
