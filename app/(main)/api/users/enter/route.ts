import client from "@/libs/server/client";

export async function POST(request: Request) {
  const { phone, email } = await request.json();
  let user;
  if (email) {
    user = await client.user.findUnique({ where: { email } });
    if (!user) {
      console.log("not found, will create");
      user = await client.user.create({ data: { name: "anonymous", email } });
    }
    console.log(user);
  }
  if (phone) {
    user = await client.user.findUnique({ where: { phone } });
    if (!user) {
      console.log("not found, will create");
      user = await client.user.create({ data: { name: "anonymous", phone } });
    }
    console.log(user);
  }

  return new Response("", {
    status: 200,
  });
}
