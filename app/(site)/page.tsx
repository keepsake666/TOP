import { getMenu } from "@/api/menu";
import { Button, Htag, P } from "../../components/index";

export default async function Home() {
  const menu = await getMenu(0);
  return (
    <>
      <Button appearence="primary" arrow="rigth">
        Button
      </Button>
      <Htag tag="h2">Hello</Htag>
      <P size="16">
        При завершении очередного проекта над графикой, специалист всегда задает
        себе вопрос о дальнейших перспективах. Отличие профессиональных
        дизайнеров заключается в том, что они гибкие. Сегодня разрабатывается
        логотип новой компании, а завтра вполне можно переключиться на
        иллюстрацию культовой книги.
      </P>
      <div>{menu.length}</div>
    </>
  );
}
