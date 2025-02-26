import { DetailedHTMLProps, HTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

export interface RatingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isAditable?: boolean;
  rating: number;
  setRating?: (rating: number) => void;
  error?: FieldError;
}
