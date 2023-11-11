import Menu from "@/components/Menu";
import Nav from "@/components/Nav";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative m-auto pb-20">
      <Nav />
      {children}
      <Menu />
    </main>
  );
}
