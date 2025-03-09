"use client";

import Link from "next/link";
import DevlinksLarge from "./icons/devlinks-large";
import DevlinksSmall from "./icons/devlinks-small";
import { Button } from "./ui/button";
import LinksHeaderIcon from "./icons/links-header";
import ProfileDetailsHeaderIcon from "./icons/profile-details-header";
import { usePathname } from "next/navigation";
import PreviewHeaderIcon from "./icons/preview-header";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center gap-4 py-4 px-6 sm:rounded-lg bg-white">
      <DevlinksSmall className="md:hidden" />
      <DevlinksLarge className="hidden md:block" />
      <Button
        data-active={pathname === "/"}
        variant={"tab"}
        className="ml-auto"
        asChild
      >
        <Link href="/">
          <LinksHeaderIcon />
          <span className="hidden md:inline">Links</span>
        </Link>
      </Button>
      <Button
        data-active={pathname === "/profile"}
        variant={"tab"}
        className="mr-auto"
        asChild
      >
        <Link href={"/profile"}>
          <ProfileDetailsHeaderIcon />
          <span className="hidden md:inline">Profile Details</span>
        </Link>
      </Button>
      <Button variant={"secondary"} asChild>
        <Link href="/preview">
          <PreviewHeaderIcon className="md:hidden" />
          <span className="hidden md:inline">Preview</span>
        </Link>
      </Button>
    </header>
  );
}
