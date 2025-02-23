import styles from "./Sort.module.css";
import SortIcon from "./sort.svg";
import cn from "classnames";
import { SortEnum, SortProps } from "./Sort.props";

export const Sort = ({ sort, setSort, className, ...props }: SortProps) => {
  return (
    <div className={cn(styles.sort, className)} {...props}>
      <span
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({ [styles.active]: sort == SortEnum.Rating })}
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </span>
      <span
        onClick={() => setSort(SortEnum.Price)}
        className={cn({ [styles.active]: sort == SortEnum.Price })}
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </span>
    </div>
  );
};
