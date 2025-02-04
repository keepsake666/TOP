import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import cn from "classnames";
import styles from "./layout.module.css";
import "./globals.css";
import { Footer } from "./components/footer/Footer";
import { Sidebar } from "./components/sidebar/Sidebar";

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
  return (
    <html lang="ru">
      <body className={cn(notoSans.className, styles.wrapper)}>
        <div className={styles.header}></div>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <main className={styles.body}>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}
