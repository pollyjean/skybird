import client from "@/libs/server/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  console.log(res);
  return new Response("", {
    status: 200,
  });
}
