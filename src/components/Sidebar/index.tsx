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
    <>
      {/* ---------- Мобильная шапка (< md) ---------- */}
      <header className="sticky top-0 z-30 flex h-[calc(3.5rem+env(safe-area-inset-top))] items-center border-b-[1.5px] border-ink bg-paper px-4 pt-[env(safe-area-inset-top)] md:hidden">
        <Link href="/" className="no-underline">
          <span className="font-serif text-2xl font-bold leading-none text-ink">
            <UnderlineHoverElement
              elem="NextAni"
              startWidth="w-[30px]"
              height="h-[5px]"
              color="bg-[#D6422B]"
              positionX="left-0"
              positionY="-bottom-2"
              rounded
            />
          </span>
        </Link>
      </header>

      {/* ---------- Десктопный сайдбар (>= md) ---------- */}
      <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col items-start gap-10 border-r-[1.5px] border-ink px-4.5 py-7 md:flex">
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
        <nav className="my-5 flex flex-col items-start gap-6">
          {links.map(({ name, href, id, icon }: INavLink) => {
            return (
              <Link
                key={id}
                href={href}
                className={`flex min-w-20 items-center gap-3 rounded-md px-3 py-2.75 text-[15px] no-underline md:w-40 ${
                  isActive(href)
                    ? "bg-ink text-paper"
                    : "text-ink hover:bg-ink hover:text-paper"
                }`}
              >
                <FontAwesomeIcon icon={icon} className="size-4" />
                <span className="font-semibold">{name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ---------- Нижняя навигация (< md) ---------- */}
      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 bottom-0 z-40 flex gap-1 border-t-[1.5px] border-ink bg-paper px-2 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] md:hidden"
      >
        {links.map(({ name, href, id, icon }: INavLink) => {
          const active = isActive(href);
          return (
            <Link
              key={id}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-12 flex-1 flex-col items-center justify-center gap-1 rounded-md px-1 py-1.5 text-[11px] font-semibold no-underline transition-colors ${
                active ? "bg-ink text-paper" : "text-ink active:bg-ink/10"
              }`}
            >
              <FontAwesomeIcon icon={icon} className="size-4.5" />
              <span className="leading-none">{name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

export default Sidebar;
