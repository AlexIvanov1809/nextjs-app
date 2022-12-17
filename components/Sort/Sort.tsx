import React from "react";
import { SortEnum, SortProps } from "./Sort.props";
import styles from "./Sort.module.css";
import SortIcon from "./sort.svg";
import cn from "classnames";

const Sort = ({
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
      <span onClick={() => setSort(SortEnum.Rating)} className={ratingStyle}>
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </span>
      <span onClick={() => setSort(SortEnum.Price)} className={priceStyle}>
        <SortIcon className={styles.sortIcon} />
        По цене
      </span>
    </div>
  );
};

export default Sort;
