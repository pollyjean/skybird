import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/libs/styles/globals.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
  const cookieStore = cookies();
  const session = cookieStore.get(process.env.SESSION_NAME || "");
  if (!session) {
    redirect("/login");
  }
  return (
    <html lang="en">
      <body className={`${inter.className} + ${"mx-auto w-full max-w-xl"}`}>
        {children}
      </body>
    </html>
  );
}
