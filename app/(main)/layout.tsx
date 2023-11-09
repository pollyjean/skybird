import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/globals.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getServerActionSession } from "@/libs/server/session";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} + ${"mx-auto w-full max-w-xl"}`}>
        {children}
      </body>
    </html>
  );
}
