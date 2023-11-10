import client from "@/libs/server/client";
import { getServerActionSession } from "@/libs/server/session";
import { handleErrors } from "@/utils";

export async function POST(request: Request) {
  const { text, image } = await request.json();
  const {
    user: { id },
  } = await getServerActionSession();
  let tweet;

  try {
    if (image) {
      tweet = await client.tweet.create({
        data: {
          text,
          image,
          authorId: id,
        },
        include: {
          author: true,
        },
      });
    } else {
      tweet = await client.tweet.create({
        data: {
          text,
          authorId: id,
        },
        include: {
          author: true,
        },
      });
    }

    return new Response(JSON.stringify({ tweetId: tweet.id }), { status: 200 });
  } catch (error: unknown) {
    return handleErrors(error);
  }
}
