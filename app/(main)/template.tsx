import Header from "@/components/Header";
import Menu from "@/components/Menu";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative m-auto py-16">
      <Header />
      {children}
      <Menu />
    </main>
  );
}
