import React, { useEffect, useState } from "react";
import { HeaderProps } from "./Header.props";
import styles from "./Header.module.css";
import cn from "classnames";
import LogoIcon from "../logo.svg";
import { ButtonIcon } from "../../components/ButtonIcon/ButtonIcon";
import { motion, useReducedMotion } from "framer-motion";
import Sidebar from "../Sidebar/Sidebar";
import { useRouter } from "next/router";

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const router = useRouter();
  const headerStyle = cn(styles.header, className);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsOpened(false);
  }, [router]);

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: "100%",
    },
  };

  return (
    <header className={headerStyle} {...props}>
      <LogoIcon />
      <ButtonIcon
        className={styles.btn}
        appearance="white"
        icon={isOpened ? "close" : "menu"}
        onClick={() => setIsOpened((prev) => !prev)}
      />
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial={"closed"}
        animate={isOpened ? "opened" : "closed"}
      >
        <Sidebar />
      </motion.div>
    </header>
  );
};

export default Header;
