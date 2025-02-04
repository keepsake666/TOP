import { JSX } from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "./Button.props";
import cn from "classnames";
import ArrowIcon from "./ArrowIcon.svg";

export const Button = ({
  children,
  appearence,
  className,
  arrow = "none",
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearence === "primary",
        [styles.ghost]: appearence === "ghost",
      })}
      {...props}
    >
      {children}
      {arrow !== "none" && (
        <span className={cn(styles.arrow, { [styles.down]: arrow === "down" })}>
          <ArrowIcon />
        </span>
      )}
    </button>
  );
};
