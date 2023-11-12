import client from "@/libs/server/client";
import { handleErrors } from "@/utils";

export async function POST(request: Request) {
  const keyword = await request.json();
  try {
    let tweet = await client.tweet.findMany({
      where: { text: { contains: keyword } },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: {
        author: {
          select: {
            username: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    if (tweet.length > 0) {
      return new Response(
        JSON.stringify({
          data: tweet,
        }),
        { status: 200 },
      );
    } else if (tweet.length === 0) {
      return new Response(
        JSON.stringify({
          message: { type: "search", value: "No search results" },
        }),
        { status: 200 },
      );
    }
  } catch (error: unknown) {
    return handleErrors(error);
  }
}
