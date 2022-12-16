import { HtmlHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface CardProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  color?: "white" | "blue";
  children: ReactNode;
}
