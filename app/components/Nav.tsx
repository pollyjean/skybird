"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const onClick = () => {
    router.back();
  };
  return (
    <>
      {pathname === "/" || (
        <nav>
          <menu>
            <li>
              <button onClick={onClick}>Back</button>
            </li>
          </menu>
        </nav>
      )}
    </>
  );
};

export default Nav;
