import { getServerActionSession } from "@/libs/server/session";

export async function POST(request: Request) {
  const session = await getServerActionSession();

  if (session) {
    session.destroy();
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  }
}
