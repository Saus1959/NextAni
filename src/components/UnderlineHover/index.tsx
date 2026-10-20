import { IUndrlineComponent } from "@/types/mainPage/sidebar";
import React from "react";

const UnderlineHoverElement = ({
  elem,
  startWidth,
  height,
  color,
  positionY,
  positionX,
  rounded = false,
}: IUndrlineComponent) => {
  return (
    <span className="relative group inline-block cursor-pointer">
      {elem}
      <span
        className={`absolute ${rounded ? "rounded-lg" : ""} ${positionX} ${positionY} ${startWidth} ${height} ${color} transition-all duration-300 group-hover:w-full`}
      ></span>
    </span>
  );
};

export default UnderlineHoverElement;
