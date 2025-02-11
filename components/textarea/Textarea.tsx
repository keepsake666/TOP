import { TextareaProps } from "./Textarea.props";
import styles from "./Textarea.module.css";
import cn from "classnames";

export const Textarea = ({ className, error, ...props }: TextareaProps) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <textarea
        placeholder="Текс отзыва"
        className={cn(styles.textarea, { [styles.error]: error })}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error.message} </span>}
    </div>
  );
};
