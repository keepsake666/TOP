import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.data}>
        OwlTop &copy; 2020 - {new Date().getFullYear()} Все права защищены
      </div>
      <div className={styles.containerText}>
        <div className={styles.text}>Пользовательское соглашение</div>
        <div className={styles.text}>Политика конфиденциальности</div>
      </div>
    </footer>
  );
};
