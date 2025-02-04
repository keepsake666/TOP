import { getMenu } from "@/api/menu";
import { getPage } from "@/api/page";
import { Htag } from "@/components";
import { Tag } from "@/components/Tag/Tag";
import styles from "./TopPage.module.css";

import { notFound } from "next/navigation";
import { HhData } from "../hh-data/HhData";
import { Advantages } from "../advantages/Advantages";

export default async function TopPage({
  alias,
  firstCategory,
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
      <div className={styles.hhTitle}>
        {" "}
        <Htag tag="h2"> Вакансии - {page?.category} </Htag>
        {products && (
          <Tag color="red" size="m">
            hh.ru
          </Tag>
        )}
      </div>
      {page?.hh && <HhData {...page.hh}></HhData>}
      {page?.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag="h2">Преимущства</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page?.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag="h2">Получаемые навыки</Htag>
      {page?.tags.map((t) => (
        <Tag key={t} color="primary">
          {t}
        </Tag>
      ))}
    </div>
  );
}
