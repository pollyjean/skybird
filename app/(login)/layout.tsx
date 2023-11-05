import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/libs/styles/globals.css";

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
  return (
    <html lang="en">
      <body className={`${inter.className} + ${"mx-auto w-full max-w-xl"}`}>
        {children}
      </body>
    </html>
  );
}
