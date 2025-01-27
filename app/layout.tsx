import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import cn from "classnames";
import styles from "./layout.module.css";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TOP APP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={cn(notoSans.className, styles.wrapper)}>
        <div className={styles.header}>Header</div>
        <div className={styles.sidebar}>sidebar</div>
        <main className={styles.body}>{children}</main>
        <div className={styles.footer}>Footer</div>
      </body>
    </html>
  );
}
