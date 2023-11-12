import Menu from "@/components/Menu";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative m-auto pb-20">
      {children}
      <Menu />
    </main>
  );
}
