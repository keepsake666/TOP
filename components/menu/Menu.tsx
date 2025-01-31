import { FirstLevelMenuItem, PageItem } from "@/interfaces/menu.interface";
import BookIcon from "./icon/books.svg";
import CoursesIcon from "./icon/courses.svg";
import ProductIcon from "./icon/product.svg";
import ServicesIcon from "./icon/services.svg";
import { TopLevelCategory } from "@/interfaces/page.interface";
import styles from "./Menu.module.css";
import cn from "classnames";
import { getMenu } from "@/api/menu";

const firstLevelMenu: FirstLevelMenuItem[] = [
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

export default async function Menu() {
  const firstCategory = TopLevelCategory.Courses;
  const menu = await getMenu(0);

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((m) => (
          <div key={m.route}>
            {" "}
            <a href={`/${m.route}`}>
              <div
                className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: m.id === firstCategory,
                })}
              >
                {m.icon}
                <span>{m.name}</span>
              </div>
            </a>
            {m.id == firstCategory && buildSecondtLevel(m)}
          </div>
        ))}
      </>
    );
  };

  const buildSecondtLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((m) => (
          <div key={m._id.secondCategory}>
            <div className={styles.secondLevel}>{m._id.secondCategory}</div>
            <div
              className={cn(styles.secondLevelBlock, {
                [styles.secondLevelBlockOpen]: m.isOpened,
              })}
            >
              {buildThirdLevel(m.pages, menuItem.route)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return pages.map((p) => (
      <a
        key={p._id}
        href={`/${route}/${p.alias}`}
        className={cn(styles.thirdLevel, {
          [styles.thirdLevelActive]: false,
        })}
      >
        {" "}
        {p.category}
      </a>
    ));
  };

  return <div className={styles.menu}>{buildFirstLevel()}</div>;
}
