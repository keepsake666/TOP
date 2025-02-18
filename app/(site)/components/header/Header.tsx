"use client";
import { HeaderProps } from "./Header.props";
import styles from "./Header.module.css";
import Logo from "../sidebar/logo.svg";
import { ButtonIcon } from "../button-icon/ButtonIcon";
import { motion, useReducedMotion } from "framer-motion";
import { Sidebar } from "../sidebar/Sidebar";
import { useState } from "react";

export const Header = ({ ...props }: HeaderProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();
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

  return (
    <header className={styles.header} {...props}>
      <Logo />
      <ButtonIcon
        appearance="white"
        icon="menu"
        onClick={() => setIsOpened(true)}
      />
      <motion.div className={styles.mobileMenu}>
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
