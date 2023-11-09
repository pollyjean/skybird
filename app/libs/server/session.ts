import {
  IronSessionOptions,
  getIronSession,
  IronSessionData,
  getServerActionIronSession,
} from "iron-session";

import { cookies } from "next/headers";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SESSION_SECRET || "",
  cookieName: process.env.SESSION_NAME || "",
};

declare module "iron-session" {
  interface IronSessionData {
    user: SessionValues;
  }
}
interface SessionValues {
  id: number;
  email: string;
  username: string;
}

const getSession = async (req: Request, res: Response) => {
  const session = getIronSession<IronSessionData>(req, res, sessionOptions);
  return session;
};

const getServerActionSession = async () => {
  const session = getServerActionIronSession<IronSessionData>(
    sessionOptions,
    cookies(),
  );
  return session;
};

const checkSessionUserId = async (userId: string) => {
  const {
    user: { id },
  } = await getServerActionSession();
  if (+userId === id) {
    return id;
  } else {
    return null;
  }
};

export { getSession, getServerActionSession, checkSessionUserId };
