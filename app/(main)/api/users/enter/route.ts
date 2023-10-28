import client from "@/libs/server/client";

export async function POST(request: Request) {
  const { phone, email } = await request.json();
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) {
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  }
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "anonymous",
            ...user,
          },
        },
      },
    },
  });
  console.log(token);

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
