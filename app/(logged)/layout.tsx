import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { unsealData } from "iron-session/edge";
import { cookies } from "next/headers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

interface SessionPayload {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export const metadata: Metadata = {
  title: "Skybird Mart",
  description: "Skybird Mart App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();

  const encryptedSession = cookieStore.get(process.env.COOKIE_NAME || "")
    ?.value;

  const session: SessionPayload | null = encryptedSession
    ? await JSON.parse(
        await unsealData(encryptedSession, {
          password: process.env.COOKIE_PW || "",
        }),
      )
    : null;

  return (
    <html lang="en">
      <body className={`${inter.className} + ${"mx-auto w-full max-w-xl"}`}>
        {session ? <main>{children}</main> : <main>not authenticated</main>}
      </body>
    </html>
  );
}
