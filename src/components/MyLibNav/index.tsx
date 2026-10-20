import { TLibNavArr } from "../../types/libraryPage/myLibNav";
import React from "react";
import UnderlineHoverElement from "../UnderlineHover";

const MyLibNav = () => {
  const libNavItems: TLibNavArr = [
    {
      id: 0,
      name: "All",
    },
    {
      id: 1,
      name: "Watching/Reading",
    },
    {
      id: 2,
      name: "In plans",
    },
    {
      id: 3,
      name: "Finished",
    },
  ];

  return (
    <nav className="flex items-center gap-10">
      {libNavItems.map((item) => {
        return (
          <UnderlineHoverElement
            key={item.id}
            elem={item.name}
            startWidth={"w-0"}
            height={"h-[3px]"}
            color={"bg-accent"}
            positionY={"left-0"}
            positionX={"-bottom-3"}
            rounded
          />
        );
      })}
      <hr />
    </nav>
  );
};

export default MyLibNav;
