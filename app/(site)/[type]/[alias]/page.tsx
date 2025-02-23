import { getPage } from "@/api/page";
import { notFound } from "next/navigation";
import TopPage from "../../components/top-page/TopPage";

type Params = Promise<{ alias: string; type: string }>;

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
