import sessionState from "@/libs/server/sessionState";
import { NextResponse } from "next/server";

export async function GET() {
  const profile = await sessionState();
  console.log(profile);
  return NextResponse.json({ ok: true, profile });
}
