import { Button, Htag, Input, P, Textarea } from "../../components/index";

export default async function Home() {
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
      <Input />
      <Textarea />
    </>
  );
}
