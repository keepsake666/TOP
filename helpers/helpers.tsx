import { FirstLevelMenuItem } from "@/interfaces/menu.interface";
import { TopLevelCategory } from "@/interfaces/page.interface";
import CoursesIcon from "./icon/courses.svg";
import ServicesIcon from "./icon/services.svg";
import BookIcon from "./icon/books.svg";
import ProductIcon from "./icon/product.svg";

export const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: "courses",
    name: "Курсы",
    icon: <CoursesIcon />,
    id: TopLevelCategory.Courses,
  },
  {
    route: "services",
    name: "Сервисы",
    icon: <ServicesIcon />,
    id: TopLevelCategory.Services,
  },
  {
    route: "books",
    name: "Книги",
    icon: <BookIcon />,
    id: TopLevelCategory.Books,
  },
  {
    route: "products",
    name: "Продукты",
    icon: <ProductIcon />,
    id: TopLevelCategory.Products,
  },
];

export const priceRu = (price: number): string =>
  price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .concat(" ₽");
