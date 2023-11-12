import Link from "next/link";

interface MenuLinkProps {
  pathname: string;
  href: string;
  label: string;
}

const MenuLink = ({ pathname, href, label }: MenuLinkProps) => {
  return (
    <li>
      <Link
        href={href}
        prefetch={false}
        className={`flex rounded-md px-5 py-2 hover:bg-base-150 ${
          href.split("/")[1] === pathname.split("/")[1] && "font-bold"
        }`}
      >
        {label}
      </Link>
    </li>
  );
};

export default MenuLink;
