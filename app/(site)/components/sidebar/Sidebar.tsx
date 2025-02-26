import cn from "classnames";
import Logo from "./logo.svg";
import styles from "./Sidebar.module.css";
import { SidebarProps } from "./Sidebar.props";
import { Menu } from "../menu/Menu";
import { Search } from "../search/Search";
import Link from "next/link";

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div className={cn(styles.sidebar, className)} {...props}>
      <Link href={"/"}>
        <Logo className={styles.logo} />
      </Link>
      <Search />
      <Menu />
    </div>
  );
};
