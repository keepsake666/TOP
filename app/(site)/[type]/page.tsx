import { Metadata } from "next";

type Params = Promise<{ type: string }>;
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { type } = await params;

  return {
    title: type,
  };
}

export default async function PageProduct({ params }: { params: Params }) {
  const { type } = await params;
  return (
    <div>
      <h1>{type}</h1>
    </div>
  );
}
