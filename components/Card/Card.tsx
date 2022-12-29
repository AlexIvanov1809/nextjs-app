import React, { ForwardedRef, forwardRef } from "react";
import { CardProps } from "./Card.props";
import styles from "./Card.module.css";
import cn from "classnames";

export const Card = forwardRef(
  (
    { color = "white", children, className, ...props }: CardProps,
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const cardStyle = cn(styles.card, className, {
      [styles.blue]: color == "blue",
    });

    return (
      <div ref={ref} className={cardStyle} {...props}>
        {children}
      </div>
    );
  }
);
