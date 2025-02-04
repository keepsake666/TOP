import { getMenu } from "@/api/menu";
import { getPage } from "@/api/page";
import { Htag } from "@/components";
import { Tag } from "@/components/Tag/Tag";
import styles from "./TopPage.module.css";

import { notFound } from "next/navigation";
import { HhData } from "../hh-data/HhData";

export default async function TopPage({
  children,
  alias,
  firstCategory = 0,
}: {
  children: React.ReactNode;
  alias: string;
  firstCategory: number;
}) {
  const page = await getPage(alias);
  const products = await getMenu(firstCategory);

  if (!page && !products) {
    return notFound();
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1"> {page?.title} </Htag>
        {products && (
          <Tag color="grey" size="m">
            {products.length}
          </Tag>
        )}
        <span>Sort</span>
      </div>
      <div style={{ border: "4px solid red" }}>{children}</div>
      <div className={styles.hhTitle}>
        {" "}
        <Htag tag="h2"> Вакансии - {page?.category} </Htag>
        {products && (
          <Tag color="grey" size="m">
            hh.ru
          </Tag>
        )}
      </div>
      <HhData {...page?.hh}></HhData>
    </div>
  );
}
