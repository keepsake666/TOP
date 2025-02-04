import { getPage } from "@/api/page";
import { notFound } from "next/navigation";
import TopPage from "../../components/top-page/TopPage";
import { TopLevelCategory } from "@/interfaces/page.interface";

const typeToCategoryMap: Record<string, TopLevelCategory> = {
  courses: TopLevelCategory.Courses,
  services: TopLevelCategory.Services,
  books: TopLevelCategory.Books,
  products: TopLevelCategory.Products,
};

type Params = Promise<{ alias: string; type: string }>;

export default async function PageProducts({ params }: { params: Params }) {
  const { alias, type } = await params;

  const page = await getPage(alias);
  if (!page) {
    notFound();
  }
  // Получаем firstCategory в зависимости от type
  const firstCategory =
    typeToCategoryMap[type.toLowerCase()] || TopLevelCategory.Products;

  return (
    <TopPage alias={alias} firstCategory={firstCategory}>
      {" "}
      <div>
        <h1>{type}</h1>
        <p>{page.title}</p>
      </div>
    </TopPage>
  );
}
