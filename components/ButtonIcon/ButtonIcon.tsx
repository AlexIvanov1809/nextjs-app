import React from "react";
import styles from "./ButtonIcon.module.css";
import { ButtonIconProps, icons } from "./ButtonIcon.props";
import cn from "classnames";

export const ButtonIcon = ({
  appearance,
  icon,
  className,
  ...props
}: ButtonIconProps): JSX.Element => {
  const btnStyle = cn(styles.button, className, {
    [styles.primary]: appearance == "primary",
    [styles.white]: appearance == "white",
  });

  const IconComponent = icons[icon];

  return (
    <button className={btnStyle} {...props}>
      <IconComponent />
    </button>
  );
};
