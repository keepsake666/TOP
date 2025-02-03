import { getPage } from "@/api/page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Products",
};

type Params = Promise<{ alias: string }>;

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
