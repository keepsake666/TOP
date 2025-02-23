import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface PProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  size?: "14" | "16" | "18";
  children: ReactNode;
}
