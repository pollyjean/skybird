import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/libs/styles/globals.css";
import { redirect } from "next/navigation";
import sessionState from "@/libs/server/sessionState";

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
  const session = await sessionState();
  if (session) {
    redirect("/");
  }
  return (
    <html lang="en">
      <body className={`${inter.className} + ${"mx-auto w-full max-w-xl"}`}>
        {children}
      </body>
    </html>
  );
}
