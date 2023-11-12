import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "@/globals.css";
import { redirect } from "next/navigation";
import { getServerActionSession } from "@/libs/server/session";
import Header from "@/components/Header";

const noto = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skybird",
  description: "Skybird Social App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerActionSession();
  if (session.user) {
    redirect("/");
  }
  return (
    <html lang="en">
      <body className={`${noto.className} + ${"mx-auto w-full max-w-xl"}`}>
        <main className="mt-20 flex flex-col items-stretch justify-center">
          <Header />
          <section className="m-auto flex w-80 flex-col gap-5">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
