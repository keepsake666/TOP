import { getMenu } from "@/api/menu";
import { getPage } from "@/api/page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Products",
};

type Params = Promise<{ alias: string }>;

export async function generateStaticParams() {
  const menu = await getMenu(0);
  return menu.flatMap((item) =>
    item.pages.map((page) => ({ alias: page.alias }))
  );
}

export default async function PageProducts({ params }: { params: Params }) {
  const { alias } = await params;
  const page = await getPage(alias);
  if (!page) {
    notFound();
  }
  return (
    <div>
      <h1>Products</h1>
      <p>{page.title}</p>
    </div>
  );
}
