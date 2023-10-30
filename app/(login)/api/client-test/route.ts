import client from "@/libs/server/client";
import { NextResponse } from "next/server";

export async function GET() {
  await client.user.create({
    data: {
      name: "bird",
      email: "bird@bird",
    },
  });
  return NextResponse.json({
    ok: true,
  });
}
