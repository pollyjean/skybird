import { unsealData } from "iron-session/edge";
import { cookies } from "next/headers";
import { SessionPayload } from "../constants";

type sessionResults = () => Promise<SessionPayload | null>;

const sessionState: sessionResults = async () => {
  const cookieStore = cookies();

  const encryptedSession = cookieStore.get(process.env.COOKIE_NAME || "")
    ?.value;

  const sessionState: SessionPayload | null = encryptedSession
    ? await JSON.parse(
        await unsealData(encryptedSession, {
          password: process.env.COOKIE_PW || "",
        }),
      )
    : null;

  return sessionState;
};

export default sessionState;
