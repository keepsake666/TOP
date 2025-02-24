import { InputProps } from "./Input.props";
import styles from "./Input.module.css";
import cn from "classnames";

export const Input = ({ className, error, ...props }: InputProps) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <input
        type="text"
        className={cn(styles.input, { [styles.error]: error })}
        {...props}
      />
      {error && (
        <span role="alert" className={styles.errorMessage}>
          {error.message}{" "}
        </span>
      )}
    </div>
  );
};
