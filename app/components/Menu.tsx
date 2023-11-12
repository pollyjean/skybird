"use client";

import { usePathname } from "next/navigation";
import MenuLink from "./MenuLink";
import useSWR from "swr";
import { generateImageUrl, postFetcher } from "@/utils";
import { FetchResults } from "@/constants";

const Menu = () => {
  const { data, error, isLoading } = useSWR<FetchResults>(
    "/profile/api",
    postFetcher,
  );
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 mt-5 border-t border-base-100 bg-base-50 bg-opacity-60 py-2 backdrop-blur-xl">
      <menu className="flex items-center justify-center gap-1">
        <MenuLink pathname={pathname} href="/new" label="New Tweet" />
        <MenuLink pathname={pathname} href="/" label="Tweets" />
        <MenuLink pathname={pathname} href="/search" label="Search" />
        <MenuLink
          pathname={pathname}
          href="/profile"
          label={
            data?.data.avatar
              ? generateImageUrl(data.data.avatar, "profileImage")
              : "Profile"
          }
        />
        <MenuLink pathname={pathname} href="/log-out" label="Log out" />
      </menu>
    </nav>
  );
};

export default Menu;
