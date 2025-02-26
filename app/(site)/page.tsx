import { Htag } from "@/components";
import { Menu } from "./components/menu/Menu";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <>
      <Htag tag="h1">Выберите курс</Htag>
      <div className={styles.menu}>
        <Menu />
      </div>
    </>
  );
}
