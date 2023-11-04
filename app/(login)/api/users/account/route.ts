import client from "@/libs/server/client";

export async function POST(request: Request) {
  const { phone, email } = await request.json();
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) {
    return new Response(JSON.stringify({ ok: false }), { status: 401 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
