import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "@/globals.css";
import { redirect } from "next/navigation";
import { getServerActionSession } from "@/libs/server/session";

const noto = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skybird Mart",
  description: "Skybird Mart App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerActionSession();
  if (!session.user) {
    redirect("/log-in");
  }
  return (
    <html lang="en">
      <body className={`${noto.className} + ${"mx-auto w-full max-w-xl"}`}>
        {children}
      </body>
    </html>
  );
}
