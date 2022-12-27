import React from "react";
import { TextariaProps } from "./Textaria.props";
import styles from "./Textaria.module.css";
import cn from "classnames";

export const Textaria = ({
  className,
  ...props
}: TextariaProps): JSX.Element => {
  const textariaStyle = cn(styles.textAria, className);

  return <textarea className={textariaStyle} {...props} />;
};
