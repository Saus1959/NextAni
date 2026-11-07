export interface ILibNavItem {
  id: number;
  name: string;
  status: "all" | "finished" | "watching" | "in plans";
}

export type TLibNavArr = ILibNavItem[];
