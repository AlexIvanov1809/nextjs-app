import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useScrollY } from "../../hooks/useScrollY";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import styles from "./Up.module.css";
import UpIcon from "./up.svg";

export const Up = () => {
  const control = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    control.start({
      opacity: y > 550 ? 1 : 0,
      display: y < 540 ? "none" : "inline-block",
    });
  }, [y, control]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      className={styles.up}
      animate={control}
      initial={{ opacity: 0 }}
    >
      <ButtonIcon appearance="primary" icon="up" onClick={scrollToTop} />
    </motion.div>
  );
};
