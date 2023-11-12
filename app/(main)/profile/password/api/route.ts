import bcrypt from "bcrypt";
import client from "@/libs/server/client";
import { getServerActionSession } from "@/libs/server/session";
import { handleErrors } from "@/utils";

export async function POST(request: Request) {
  const {
    user: { id },
  } = await getServerActionSession();
  const { password, newPassword } = await request.json();

  let user = await client.user.findUnique({
    where: { id },
    select: { password: true },
  });

  const textPassword = password;
  const protectedPassword = user?.password as string;

  try {
    const isEqual = await bcrypt.compare(textPassword, protectedPassword);
    if (isEqual) {
      const protectedPassword = await bcrypt.hash(newPassword, 8);
      user = await client.user.update({
        where: { id },
        select: { password: true },
        data: { password: protectedPassword },
      });
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } else {
      return new Response(
        JSON.stringify({
          message: { type: "password", value: "Password is incorrect" },
        }),
        { status: 400 },
      );
    }
  } catch (error: unknown) {
    return handleErrors(error);
  }
}
