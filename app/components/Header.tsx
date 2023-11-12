import { ProfileProps } from "@/constants";
import { Concert_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const concertOne = Concert_One({ subsets: ["latin"], weight: ["400"] });

const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0  bg-[#FFC87CFF] bg-opacity-30 pt-4 backdrop-blur-xl">
      <Link href="/">
        <h1
          className={`${
            concertOne.className
          } + ${"flex items-center justify-center gap-1 text-4xl uppercase text-orange"}`}
        >
          <Image
            src="/porg.png"
            alt="Porg"
            className="r-3 h-10 w-10"
            {...ProfileProps}
          />
          Skybird
        </h1>
      </Link>
    </header>
  );
};

export default Header;
