import React from "react";
import { DividerProps } from "./Divider.props";
import styles from "./Divider.module.css";
import cn from "classnames";

export const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
  const dividerStyle = cn(styles.hr, className);

  return <hr className={dividerStyle} {...props} />;
};
