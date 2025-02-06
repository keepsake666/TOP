import { getPage } from "@/api/page";
import { Htag } from "@/components";
import { Tag } from "@/components/Tag/Tag";
import styles from "./TopPage.module.css";

import { notFound } from "next/navigation";
import { HhData } from "../hh-data/HhData";
import { Advantages } from "../advantages/Advantages";
import { Title } from "../title/Title";
import { getProducts } from "@/api/products";

export default async function TopPage({
  alias,
}: {
  children: React.ReactNode;
  alias: string;
}) {
  const page = await getPage(alias);
  const products = await getProducts(page?.category);
  if (!page && !products) {
    return notFound();
  }
  return (
    <div className={styles.wrapper}>
      <Title page={page} products={products} />
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
