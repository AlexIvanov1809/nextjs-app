import { HtmlHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface PProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  size?: "s" | "m" | "l";
  children: ReactNode;
}
