import { FetchResults, ProfileProps } from "@/constants";
import { postFetcher } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface MenuLinkProps {
  pathname: string;
  href: string;
  label: string;
}

const MenuLink = ({ pathname, href, label }: MenuLinkProps) => {
  const [name, setName] = useState("");
  const { data, isLoading } = useSWR<FetchResults>("/profile/api", postFetcher);
  useEffect(() => {
    if (!isLoading && data?.data.username) {
      setName(data.data.username);
    }
  }, [isLoading, data?.data]);
  return (
    <li>
      <Link
        href={href}
        prefetch={false}
        className={`flex rounded-md px-5 py-2 hover:bg-base-150 ${
          href.split("/")[1] === pathname.split("/")[1] && "font-bold"
        }`}
      >
        {label.includes("http") ? (
          <span className="flex items-center">
            <Image
              src={label}
              alt={!!name ? `${name}'s Avatar` : "User's Avatar"}
              className="mr-2 h-6 w-6 rounded-md"
              {...ProfileProps}
            />
            {label}
          </span>
        ) : (
          <>{label}</>
        )}
      </Link>
    </li>
  );
};

export default MenuLink;
