import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import cn from "classnames";
import styles from "./layout.module.css";
import "./globals.css";
import { Footer } from "@/components";
import { API } from "../api";
import { MenuItem } from "@/interfaces/menu.interface";
import { getMenu } from "../api/menu";

const notoSans = Noto_Sans_KR({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TOP APP",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await getMenu(0);
  return (
    <html lang="ru">
      <body className={cn(notoSans.className, styles.wrapper)}>
        <div className={styles.header}>Header</div>
        <div className={styles.sidebar}>sidebar</div>
        <main className={styles.body}>
          {children}
          <div>{menu.length}</div>
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
