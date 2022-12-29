import React, { ForwardedRef, forwardRef } from "react";
import { InputProps } from "./Input.props";
import styles from "./Input.module.css";
import cn from "classnames";

export const Input = forwardRef(
  (
    { className, error, ...props }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const inputStyle = cn(styles.input, {
      [styles.error]: error,
    });
    const wrapperStyle = cn(styles.inputWrapper, className);

    return (
      <div className={wrapperStyle}>
        <input ref={ref} className={inputStyle} {...props} />
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
