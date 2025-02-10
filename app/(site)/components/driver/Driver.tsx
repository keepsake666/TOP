import styles from "./Driver.module.css";
import cn from "classnames";
import { DividerProps } from "./Driver.props";

export const Divider = ({ className, ...props }: DividerProps) => {
  return <hr className={cn(className, styles.hr)} {...props} />;
};
