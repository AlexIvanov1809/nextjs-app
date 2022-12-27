import React from "react";
import { InputProps } from "./Input.props";
import styles from "./Input.module.css";
import cn from "classnames";

export const Input = ({ className, ...props }: InputProps): JSX.Element => {
  const inputStyle = cn(styles.input, className);

  return <input className={inputStyle} {...props} />;
};
