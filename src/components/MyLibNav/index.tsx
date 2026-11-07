import Link from "next/link";
import { TLibNavArr } from "../../types/libraryPage/myLibNav";
import UnderlineHoverElement from "../UnderlineHover";
import { useSearchParams } from "next/navigation";

const libNavCat: TLibNavArr = [
  {
    id: 0,
    name: "All",
    status: "all",
  },
  {
    id: 1,
    name: "Watching/Reading",
    status: "watching",
  },
  {
    id: 2,
    name: "In plans",
    status: "in plans",
  },
  {
    id: 3,
    name: "Finished",
    status: "finished",
  },
];

const MyLibNav = () => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("status") || "all";
  return (
    <nav className="-mx-4 flex items-center gap-7 px-4 max-sm:overflow-x-auto max-sm:pb-5 max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden sm:mx-0 sm:gap-10 sm:px-0">
      {libNavCat.map((item) => {
        return (
          <Link
            key={item.id}
            className="shrink-0 whitespace-nowrap"
            href={`/library${item.status === "all" ? "" : `?status=${item.status}`}`}
          >
            <UnderlineHoverElement
              elem={item.name}
              startWidth={"w-0"}
              height={"h-[3px]"}
              color={"bg-accent"}
              positionY={"left-0"}
              positionX={"-bottom-3"}
              rounded
              selected={currentTab === item.status}
            />
          </Link>
        );
      })}
      <hr />
    </nav>
  );
};

export default MyLibNav;
