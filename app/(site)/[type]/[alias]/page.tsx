import { getPage } from "@/api/page";
import { notFound } from "next/navigation";
import TopPage from "../../components/top-page/TopPage";
import { getMenu } from "@/api/menu";

type Params = Promise<{ alias: string; type: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { alias } = await params;
  const page = await getPage(alias);
  return {
    title: page?.title || "Товары",
  };
}

export async function generateStaticParams() {
  const menu = await getMenu(0);
  return menu.flatMap((item) =>
    item.pages.map((page) => ({ alias: page.alias, type: page.category }))
  );
}

export default async function PageProducts({ params }: { params: Params }) {
  const { alias, type } = await params;

  const page = await getPage(alias);
  if (!page) {
    notFound();
  }

  return (
    <TopPage alias={alias}>
      {" "}
      <div>
        <h1>{type}</h1>
        <p>{page.title}</p>
      </div>
    </TopPage>
  );
}
