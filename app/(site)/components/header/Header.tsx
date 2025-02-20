"use client";
import { HeaderProps } from "./Header.props";
import styles from "./Header.module.css";
import Logo from "../sidebar/logo.svg";
import { ButtonIcon } from "../button-icon/ButtonIcon";
import { motion, useReducedMotion } from "framer-motion";
import { Sidebar } from "../sidebar/Sidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const Header = ({ ...props }: HeaderProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();
  const path = usePathname();
  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: "100%",
    },
  };
  useEffect(() => {
    setIsOpened(false);
  }, [path]);
  return (
    <header className={styles.header} {...props}>
      <Logo />
      <ButtonIcon
        appearance="white"
        icon="menu"
        onClick={() => setIsOpened(true)}
      />
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial={"closed"}
        animate={isOpened ? "opened" : "closed"}
      >
        <Sidebar />
        <ButtonIcon
          className={styles.menuClose}
          appearance="white"
          icon="close"
          onClick={() => setIsOpened(false)}
        />
      </motion.div>
    </header>
  );
};
