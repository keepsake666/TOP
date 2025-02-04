"use client";
import { getMenu } from "@/api/menu";
import styles from "./Menu.module.css";
import { useEffect, useState } from "react";
import {
  FirstLevelMenuItem,
  MenuItem,
  PageItem,
} from "@/interfaces/menu.interface";
import { firstLevelMenu } from "@/helpers/helpers";
import cn from "classnames";
import { TopLevelCategory } from "@/interfaces/page.interface";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Menu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const firstCategory = TopLevelCategory.Courses;
  const pathname = usePathname();

  const openSecondLevel = (secondCategory: string) => {
    setMenu((prevMenu) =>
      prevMenu.map((m) =>
        m._id.secondCategory === secondCategory
          ? { ...m, isOpened: !m.isOpened }
          : m
      )
    );
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await getMenu(firstCategory);
        setMenu(res);
      } catch (err) {
        setError(`Ошибка загрузки меню ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [firstCategory]);

  const buildFirstLevel = () => (
    <>
      {firstLevelMenu.map((m) => (
        <div key={m.route}>
          <Link href={`/${m.route}`}>
            <div
              className={cn(styles.firstLevel, {
                [styles.firstLevelActive]: m.id === firstCategory,
              })}
            >
              {m.icon}
              <span>{m.name}</span>
            </div>
          </Link>
          {m.id === firstCategory && buildSecondLevel(m)}
        </div>
      ))}
    </>
  );

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => (
    <div className={styles.secondBlock}>
      {menu.map((m) => {
        // Проверяем, активен ли данный элемент
        const isActive = m.pages.some(
          (p) => p.alias === pathname.split("/")[2]
        );
        return (
          <div key={m._id.secondCategory}>
            <div
              className={styles.secondLevel}
              onClick={() => openSecondLevel(m._id.secondCategory)}
            >
              {m._id.secondCategory}
            </div>
            <div
              className={cn(styles.secondLevelBlock, {
                [styles.secondLevelBlockOpen]: isActive || m.isOpened,
              })}
            >
              {m.isOpened && buildThirdLevel(m.pages, menuItem.route)}
            </div>
          </div>
        );
      })}
    </div>
  );

  const buildThirdLevel = (pages: PageItem[], route: string) =>
    pages.map((p) => (
      <Link
        key={p._id}
        href={`/${route}/${p.alias}`}
        className={cn(styles.thirdLevel, {
          [styles.thirdLevelActive]: `/${route}/${p.alias}` === pathname,
        })}
      >
        {p.category}
      </Link>
    ));

  if (loading) {
    return <div className={styles.menu}>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.menu}>{error}</div>;
  }

  return <div className={styles.menu}>{buildFirstLevel()}</div>;
}
