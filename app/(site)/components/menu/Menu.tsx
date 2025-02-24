"use client";
import { getMenu } from "@/api/menu";
import styles from "./Menu.module.css";
import { useCallback, useEffect, useState, KeyboardEvent } from "react";
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
import { motion } from "framer-motion";

export function Menu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [firstCategory, setFirstCategory] = useState<TopLevelCategory>(
    TopLevelCategory.Courses
  );
  const pathname = usePathname();

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.code == "Space" || key.code == "Enter") {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    hidden: {
      marginBottom: 0,
    },
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: "auto",
    },
    hidden: {
      opacity: 0,
      height: 0,
    },
  };

  const fetchMenu = useCallback(async (category: TopLevelCategory) => {
    setLoading(true);
    try {
      const res = await getMenu(category);
      setMenu(res);
      setError(null);
    } catch (err) {
      setError(`Ошибка загрузки меню: ${err}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenu(firstCategory);
  }, [firstCategory, fetchMenu]);

  const handleFirstLevelClick = useCallback(
    (category: TopLevelCategory) => {
      setFirstCategory(category);
      fetchMenu(category);
    },
    [fetchMenu]
  );

  const openSecondLevel = (secondCategory: string) => {
    setMenu((prevMenu) =>
      prevMenu.map((m) =>
        m._id.secondCategory === secondCategory
          ? { ...m, isOpened: !m.isOpened }
          : m
      )
    );
  };

  const buildFirstLevel = () => (
    <>
      {firstLevelMenu.map((m) => (
        <div key={m.route}>
          <Link href={`/${m.route}`}>
            <div
              className={cn(styles.firstLevel, {
                [styles.firstLevelActive]: m.id === firstCategory,
              })}
              onClick={() => handleFirstLevelClick(m.id)}
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
    <ul className={styles.secondBlock}>
      {menu.map((m) => {
        const isActive = m.pages.some(
          (p) => p.alias === pathname.split("/")[2]
        );
        if (isActive) {
          m.isOpened = true;
        }

        return (
          <li key={m._id.secondCategory}>
            <button
              tabIndex={0}
              onKeyDown={(key: KeyboardEvent) =>
                openSecondLevelKey(key, m._id.secondCategory)
              }
              className={styles.secondLevel}
              onClick={() => openSecondLevel(m._id.secondCategory)}
            >
              {m._id.secondCategory}
            </button>
            <motion.div
              layout
              variants={variants}
              initial={m.isOpened ? "visible" : "hidden"}
              animate={m.isOpened ? "visible" : "hidden"}
              className={cn(styles.secondLevelBlock)}
            >
              {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}{" "}
            </motion.div>
          </li>
        );
      })}
    </ul>
  );

  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpened: boolean
  ) =>
    pages.map((p) => (
      <motion.div key={p._id} variants={variantsChildren}>
        <Link
          tabIndex={isOpened ? 0 : -1}
          href={`/${route}/${p.alias}`}
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: `/${route}/${p.alias}` === pathname,
          })}
        >
          {p.category}
        </Link>
      </motion.div>
    ));

  if (loading) return <div className={styles.menu}>Загрузка...</div>;
  if (error) return <div className={styles.menu}>{error}</div>;

  return (
    <nav role="navigation" className={styles.menu}>
      {buildFirstLevel()}
    </nav>
  );
}
