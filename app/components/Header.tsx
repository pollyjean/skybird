import { ProfileProps } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0  bg-[#FFC87CFF] bg-opacity-30 pt-4 backdrop-blur-xl">
      <Link href="/">
        <h1 className="flex items-center justify-center gap-1 font-bold uppercase">
          <Image
            src="/porg.png"
            alt="Porg"
            className="r-3 h-10 w-10"
            {...ProfileProps}
          />
          skybird
        </h1>
      </Link>
    </header>
  );
};

export default Header;
