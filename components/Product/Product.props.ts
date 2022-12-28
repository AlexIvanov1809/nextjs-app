import { HtmlHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { ProductModel } from "../../interfaces/product.interface";

export interface ProductProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  product: ProductModel;
}
