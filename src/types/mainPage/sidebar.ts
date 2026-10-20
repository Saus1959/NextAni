import { ReactNode } from "react";

export interface INavLink {
  id: number;
  href: string;
  icon: any;
  name: string;
}

export type TNavLinks = INavLink[];

export interface IUndrlineComponent {
  elem: any;
  startWidth: string;
  height: string;
  color: string;
  positionX: string;
  positionY: string;
  rounded?: boolean;
}
