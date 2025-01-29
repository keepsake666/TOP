import { getPage } from "@/app/api/page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Products",
};

export default async function PageProducts({
  params,
}: {
  params: { aliase: string };
}) {
  const page = await getPage(params.aliase);
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
