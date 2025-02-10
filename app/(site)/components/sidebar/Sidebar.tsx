import cn from "classnames";
import Logo from "./logo.svg";
import styles from "./Sidebar.module.css";
import { SidebarProps } from "./Sidebar.props";
import { Menu } from "../menu/Menu";
import { Search } from "../search/Search";

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div className={cn(styles.sidebar, className)} {...props}>
      <Logo className={styles.logo} />
      <Search />
      <Menu />
    </div>
  );
};
