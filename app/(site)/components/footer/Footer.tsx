import styles from "./Footer.module.css";
import { FooterProps } from "./Footer.props";

export const Footer = ({}: FooterProps) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.data}>
        OwlTop &copy; 2020 - {new Date().getFullYear()} Все права защищены
      </div>
      <div className={styles.containerText}>
        <a className={styles.text} href="#" target="_blank">
          Пользовательское соглашение
        </a>
        <a className={styles.text} href="#" target="_blank">
          Политика конфиденциальности
        </a>
      </div>
    </footer>
  );
};
