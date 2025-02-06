
import { TopPageModel } from "@/interfaces/page.interface";
import { ProductModel } from '@/interfaces/product.interface';
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface TitleProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  page: TopPageModel | null;
  products: ProductModel[];
}
