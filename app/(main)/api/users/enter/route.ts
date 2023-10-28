import { TWILIO_ENV } from "@/libs/client/constants";
import client from "@/libs/server/client";
import twilio from "twilio";

const twilioClient = twilio(TWILIO_ENV.sid, TWILIO_ENV.token);

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
  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: TWILIO_ENV.messagingSid,
      to: TWILIO_ENV.phone,
      body: `Your Login token is ${payload}`,
    });
    console.log(message);
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
