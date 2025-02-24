"use client";
import { Button, Rating, Tag } from "@/components";
import { Card } from "../card/Card";
import styles from "./Product.module.css";
import { ProductProps } from "./Product.props";
import { declOfNum, priceRu } from "@/helpers/helpers";
import { Divider } from "../driver/Driver";
import cn from "classnames";
import Image from "next/image";
import { useRef, useState } from "react";
import { Review } from "../review/Review";
import { ReviewForm } from "../review-form/ReviewForm";
import { motion } from "framer-motion";

export const Product = motion(
  ({ product, className, ref, ...props }: ProductProps) => {
    const [isReviewOpeden, setIsReviewOpeden] = useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);
    const screllToReview = () => {
      setIsReviewOpeden(true);
      reviewRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      reviewRef.current?.focus();
    };

    return (
      <div className={className} {...props} ref={ref}>
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
            <a href="#ref" onClick={screllToReview}>
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
              arrow={isReviewOpeden ? "down" : "rigth"}
              className={styles.reviewButton}
              onClick={() => setIsReviewOpeden(!isReviewOpeden)}
              aria-expanded={isReviewOpeden}
            >
              Читать отзывы
            </Button>
          </div>
        </Card>
        <Card
          tabIndex={isReviewOpeden ? 0 : -1}
          color="blue"
          className={cn(styles.reviews, {
            [styles.opened]: isReviewOpeden,
            [styles.closed]: !isReviewOpeden,
          })}
          ref={reviewRef}
        >
          {product.reviews.map((r) => (
            <div key={r._id}>
              <Review review={r} />
              <Divider />
            </div>
          ))}
          <ReviewForm productId={product._id} />
        </Card>
      </div>
    );
  }
);
