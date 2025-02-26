"use client";
import { Htag } from "@/components";
import { SortEnum } from "../sort/Sort.props";
import styles from "./Title.module.css";
import { Tag } from "@/components/Tag/Tag";
import { Sort } from "../sort/Sort";
import cn from "classnames";
import { TitleProps } from "./Title.props";
import { useReducer } from "react";
import { sortReducer } from "@/helpers/helpers";
import { Product } from "../product/Product";

export const Title = ({ page, products, className, ...props }: TitleProps) => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    {
      products,
      sort: SortEnum.Rating,
    }
  );

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  return (
    <>
      <div className={cn(styles.title, className)} {...props}>
        <Htag tag="h1"> {page?.title} </Htag>
        {sortedProducts && (
          <Tag
            color="grey"
            size="m"
            aria-label={sortedProducts.length + "элементов"}
          >
            {sortedProducts.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort}></Sort>
      </div>
      <div>
        {page &&
          products.map((p) => (
            <Product layout key={p._id} product={p}></Product>
          ))}
      </div>
    </>
  );
};
