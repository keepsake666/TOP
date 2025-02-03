import { getPage } from "@/api/page";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Services",
};

type Params = Promise<{ alias: string }>;

export default async function PageServices({ params }: { params: Params }) {
  const { alias } = await params;
  const page = await getPage(alias);
  if (!page) {
    notFound();
  }
  return (
    <div>
      <h1>Services</h1>
      <p>{page.title}</p>
    </div>
  );
}
