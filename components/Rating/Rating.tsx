"use client";
import styles from "./Rating.module.css";
import cn from "classnames";
import { RatingProps } from "./Rating.props";
import { JSX, useEffect, useState, KeyboardEvent } from "react";
import StarIcon from "./star.svg";

export const Rating = ({
  isAditable = false,
  rating,
  setRating,
  error,
  ...props
}: RatingProps) => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
    new Array(5).fill(<></>)
  );

  useEffect(() => {
    constructRating(rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  const constructRating = (currentRating: number) => {
    const updateArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        <span
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isAditable,
          })}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => onClick(i + 1)}
          key={i}
          tabIndex={isAditable ? 0 : -1}
          onKeyDown={handleKey}
          role={isAditable ? "slider" : ""}
          aria-invalid={error ? true : false}
          aria-valuenow={rating}
          aria-valuemin={1}
          aria-valuemax={5}
          aria-label={isAditable ? "Укажите рейтинг" : "рейтинг"}
        >
          <StarIcon />
        </span>
      );
    });
    setRatingArray(updateArray);
  };

  const changeDisplay = (i: number) => {
    if (!isAditable) {
      return;
    }
    constructRating(i);
  };

  const onClick = (i: number) => {
    if (!isAditable || !setRating) {
      return;
    }
    setRating(i);
  };

  const handleKey = (e: KeyboardEvent) => {
    if (!isAditable || !setRating) {
      return;
    }
    if (e.code == "ArrowRight" || e.code == "ArrowUp") {
      if (!rating) {
        setRating(1);
      } else {
        e.preventDefault();
        setRating(rating < 5 ? rating + 1 : 5);
      }
    }
    if (e.code == "ArrowLeft" || e.code == "ArrowDown") {
      e.preventDefault();
      setRating(rating > 1 ? rating - 1 : 1);
    }
  };

  return (
    <div
      {...props}
      className={cn(styles.wrapper, {
        [styles.error]: error,
      })}
    >
      {ratingArray.map((r, i) => (
        <span key={i}>{r}</span>
      ))}
      {error && (
        <span role="alert" className={styles.errorMessage}>
          {error.message}{" "}
        </span>
      )}
    </div>
  );
};
