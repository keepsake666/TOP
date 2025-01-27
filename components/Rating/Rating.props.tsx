import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface RatingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isAditable?: boolean;
  rating: number;
  setRating?: (rating: number) => void;
}
