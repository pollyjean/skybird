import client from "@/libs/server/client";
import { handleErrors } from "@/utils";

export async function POST(
  request: Request,
  { params }: { params: { userId: string } },
) {
  const { userId, text, image } = await request.json();
  let tweet;

  try {
    if (image) {
      tweet = await client.tweet.create({
        data: {
          text,
          image: image,
          authorId: userId,
        },
        include: {
          author: true,
        },
      });
    } else {
      tweet = await client.tweet.create({
        data: {
          text,
          authorId: userId,
        },
        include: {
          author: true,
        },
      });
    }

    console.log(tweet);

    return new Response(JSON.stringify({ tweetId: tweet.id }), { status: 200 });
  } catch (error: unknown) {
    return handleErrors(error);
  }
}
