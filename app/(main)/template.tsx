import Menu from "@/components/Menu";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {children}
      <Menu />
    </main>
  );
}
