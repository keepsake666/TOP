"use client";
import { Button, Rating, Tag } from "@/components";
import { Card } from "../card/Card";
import styles from "./Product.module.css";
import { ProductProps } from "./Product.props";
import { declOfNum, priceRu } from "@/helpers/helpers";
import { Divider } from "../driver/Driver";
import Image from "next/image";

export const Product = ({ product, className, ...props }: ProductProps) => {
  return (
    <div className={className} {...props}>
      <Card className={styles.product}>
        <div className={styles.logo}>
          <Image
            src={product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          <span>
            <span className="visualy__hidden">цена</span>
            {priceRu(product.price)}
          </span>
          {product.oldPrice && (
            <Tag className={styles.oldPrice} color="green">
              <span className="visualy__hidden">скидка</span>
              {priceRu(product.price - product.oldPrice)}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>
          <span className="visualy__hidden">кредит</span>
          {priceRu(product.credit)}/<span className={styles.month}>мес</span>
        </div>
        <div className={styles.rating}>
          <span className="visualy__hidden">
            {"рейтинг" + (product.reviewAvg ?? product.initialRating)}
          </span>
          <Rating rating={product.reviewAvg ?? product.initialRating} />
        </div>
        <div className={styles.tags}>
          {product.categories.map((c) => (
            <Tag key={c} className={styles.category} color="ghost">
              {c}
            </Tag>
          ))}{" "}
        </div>
        <div className={styles.priceTitle} aria-hidden={true}>
          цена
        </div>
        <div className={styles.creditTitle} aria-hidden={true}>
          кредит{" "}
        </div>
        <div className={styles.rateTitle}>
          <a href="#ref">
            {product.reviewCount}{" "}
            {declOfNum(product.reviewCount, ["отзыв", "отзыва", "отзывов"])}
          </a>
        </div>
        <Divider className={styles.hr} />
        <div className={styles.description}> {product.description}</div>
        <div className={styles.feature}>
          {product.characteristics.map((c) => (
            <div className={styles.characteristics} key={c.name}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.advBlock}>
          {product.advantages && (
            <div className={styles.advantages}>
              <div className={styles.advTitle}>Преимущества</div>
              <div>{product.advantages}</div>
            </div>
          )}
          {product.disadvantages && (
            <div className={styles.disadvantages}>
              <div className={styles.advTitle}>Недостатки</div>
              <div>{product.disadvantages}</div>
            </div>
          )}
        </div>
        <Divider className={styles.hr} />
        <div className={styles.actions}>
          <Button appearence="primary">Узнать подробнее</Button>
          <Button
            appearence="ghost"
            arrow="rigth"
            className={styles.reviewButton}
          >
            Читать отзывы
          </Button>
        </div>
      </Card>
    </div>
  );
};
