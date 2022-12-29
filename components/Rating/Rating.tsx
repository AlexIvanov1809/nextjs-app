import React, {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
} from "react";
import { RatingProps } from "./Rating.props";
import styles from "./Rating.module.css";
import StarIcon from "./star.svg";
import cn from "classnames";

export const Rating = forwardRef(
  (
    {
      isEditable = false,
      rating,
      error,
      setRating,
      className,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArr, setRatingArr] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );

    useEffect(() => {
      constructRating(rating);
    }, [rating]);

    const constructRating = (currantRating: number) => {
      const updatedArr = ratingArr.map((e: JSX.Element, i: number) => {
        const style = cn(styles.star, {
          [styles.filled]: i < currantRating,
          [styles.editable]: isEditable,
        });

        return (
          <span
            key={i}
            className={style}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => handleClick(i + 1)}
          >
            <StarIcon
              tabIndex={isEditable ? 0 : -1}
              onKeyDown={(e: KeyboardEvent<SVGElement>) =>
                isEditable && handleSpace(i + 1, e)
              }
            />
          </span>
        );
      });
      setRatingArr(updatedArr);
    };

    const handleClick = (i: number) => {
      if (!isEditable || !setRating) {
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

    const changeDisplay = (i: number) => {
      if (!isEditable) {
        return;
      }
      constructRating(i);
    };

    const ratingStyle = cn(styles.wrapper, { [styles.error]: error });

    return (
      <div ref={ref} className={ratingStyle} {...props}>
        {ratingArr.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
