import React, { ForwardedRef, forwardRef } from "react";
import { TextariaProps } from "./Textaria.props";
import styles from "./Textaria.module.css";
import cn from "classnames";

export const Textaria = forwardRef(
  (
    { className, error, ...props }: TextariaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ): JSX.Element => {
    const textariaStyle = cn(styles.textAria, {
      [styles.error]: error,
    });
    const wrapperStyle = cn(styles.textAriaWrapper, className);
    return (
      <div className={wrapperStyle}>
        <textarea ref={ref} className={textariaStyle} {...props} role="alert" />
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
