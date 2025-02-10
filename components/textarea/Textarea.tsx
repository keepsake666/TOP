import { TextareaProps } from "./Textarea.props";
import styles from "./Textarea.module.css";
import cn from "classnames";

export const Textarea = ({ className, ...props }: TextareaProps) => {
  return <textarea placeholder='Текс отзыва' className={cn(styles.textarea, className)} {...props} />;
};
