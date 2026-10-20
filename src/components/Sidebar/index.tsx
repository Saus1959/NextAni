"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faTv,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { INavLink, TNavLinks } from "../../types/mainPage/sidebar";
import Link from "next/link";
import React from "react";
import UnderlineHoverElement from "../UnderlineHover";
import { usePathname } from "next/navigation";

const links: TNavLinks = [
  {
    id: 0,
    href: "/",
    icon: faHouse,
    name: "Home",
  },
  {
    id: 1,
    href: "/search",
    icon: faMagnifyingGlass,
    name: "Search",
  },
  {
    id: 2,
    href: "/library",
    icon: faTv,
    name: "Library",
  },
  {
    id: 3,
    href: "/profie",
    icon: faUserTie,
    name: "Profile",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="h-screen sticky top-0 shrink-0 w-56 flex flex-col items-start border-r-[1.5px] border-ink px-4.5 py-7 gap-10">
      <Link href="/">
        <h1 className="px-2 font-serif text-2xl md:text-[34px] font-bold leading-[1.1]">
          <UnderlineHoverElement
            elem="NextAni"
            startWidth="w-[30px]"
            height="h-[7px]"
            color="bg-[#D6422B]"
            positionX="left-0"
            positionY="-bottom-6"
            rounded
          />
        </h1>
      </Link>
      <nav className="flex flex-col items-start gap-6 my-5">
        {links.map(({ name, href, id, icon }: INavLink) => {
          return (
            <Link
              key={id}
              href={href}
              className={`flex items-center gap-3 rounded-md min-w-20 px-3 md:w-40 py-2.75 text-[15px] no-underline ${
                isActive(href)
                  ? "bg-ink text-paper"
                  : "text-ink hover:bg-ink hover:text-paper"
              }`}
            >
              <FontAwesomeIcon icon={icon} className="size-4" />
              <h2>{name}</h2>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
