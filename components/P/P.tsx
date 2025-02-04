import { PProps } from "./P.props";
import styles from "./P.module.css";
import cn from "classnames";

export const P = ({ size = "16", children, ...props }: PProps) => {
  return (
    <p
      className={cn(styles.p, {
        [styles.s]: size === "14",
        [styles.m]: size === "16",
        [styles.b]: size === "18",
      })}
      {...props}
    >
      {children}
    </p>
  );
};
