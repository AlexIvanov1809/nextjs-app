import React, { KeyboardEvent } from "react";
import { SortEnum, SortProps } from "./Sort.props";
import styles from "./Sort.module.css";
import SortIcon from "./sort.svg";
import cn from "classnames";

export const Sort = ({
  sort,
  setSort,
  children,
  className,
  ...props
}: SortProps): JSX.Element => {
  const sortStyle = cn(styles.sort, className);
  const ratingStyle = cn({
    [styles.active]: sort === SortEnum.Rating,
  });
  const priceStyle = cn({
    [styles.active]: sort === SortEnum.Price,
  });

  return (
    <div className={sortStyle} {...props}>
      <div className={styles.sortName} id="sort">
        Сортировка
      </div>
      <button
        id="rating"
        onClick={() => setSort(SortEnum.Rating)}
        className={ratingStyle}
        aria-selected={sort === SortEnum.Rating}
        aria-labelledby="sort rating"
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </button>
      <button
        id="price"
        onClick={() => setSort(SortEnum.Price)}
        className={priceStyle}
        aria-selected={sort === SortEnum.Price}
        aria-labelledby="sort price"
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </button>
    </div>
  );
};
