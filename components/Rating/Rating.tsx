import React, {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
  useRef,
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
      tabIndex,
      ...props
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const [ratingArr, setRatingArr] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );

    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      constructRating(rating);
    }, [rating, tabIndex]);

    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }
      if (!rating && i === 0) {
        return tabIndex ?? 0;
      }
      if (r == i + 1) {
        return tabIndex ?? 0;
      }
      return -1;
    };

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
            tabIndex={computeFocus(rating, i)}
            onKeyDown={handleKey}
            ref={(r) => ratingArrayRef.current?.push(r)}
            role={isEditable ? "slider" : ""}
            aria-valuenow={rating}
            aria-valuemax={5}
            aria-valuemin={1}
            aria-label={isEditable ? "Укажите рейтинг" : "рейтинг" + rating}
            aria-invalid={error ? true : false}
          >
            <StarIcon />
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

    const handleKey = (e: KeyboardEvent) => {
      if (!isEditable || !setRating) {
        return;
      }

      if (e.code === "ArrowRight" || e.code === "ArrowUp") {
        if (!rating) {
          setRating(1);
        } else {
          e.preventDefault();
          setRating(rating < 5 ? rating + 1 : 5);
        }
        ratingArrayRef.current[rating]?.focus();
      }
      if (e.code === "ArrowLeft" || e.code === "ArrowDown") {
        if (!rating) {
          setRating(1);
        } else {
          e.preventDefault();
          setRating(rating > 1 ? rating - 1 : 1);
        }
        ratingArrayRef.current[rating - 2]?.focus();
      }
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
        {error && (
          <span className={styles.errorMessage} role="alert">
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
