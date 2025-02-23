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
        >
          <StarIcon
            tabIndex={isAditable ? 0 : -1}
            onKeyDown={(e: KeyboardEvent<SVGElement>) =>
              isAditable && handleSpace(i + 1, e)
            }
          />
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

  const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
    if (e.code != "Space" || !setRating) {
      return;
    }
    setRating(i);
  };

  return (
    <div {...props}>
      {ratingArray.map((r, i) => (
        <span key={i}>{r}</span>
      ))}
    </div>
  );
};
