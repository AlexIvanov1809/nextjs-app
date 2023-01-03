import React, { useContext, KeyboardEvent, useState } from "react";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import styles from "./Menu.module.css";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLevelMenu } from "../../helpers/helpers";
import { motion, useReducedMotion } from "framer-motion";

const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const [announce, setAnnounce] = useState<"closed" | "opened" | undefined>();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion
        ? {}
        : {
            when: "beforeChildren",
            staggerChildren: 0.2,
          },
    },
    hidden: { marginBottom: 0 },
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      minHeight: 29,
    },
    hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 },
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory === secondCategory) {
            setAnnounce(m.isOpened ? "closed" : "opened");
            m.isOpened = !m.isOpened;
          }
          return m;
        })
      );
  };

  const openSecondLevelKey = (key: KeyboardEvent, category: string) => {
    if (key.code === "Space" || key.code === "Enter") {
      key.preventDefault();
      openSecondLevel(category);
    }
  };

  const buildFirstLevel = () => {
    return (
      <ul>
        {firstLevelMenu.map((firstMenu) => (
          <li
            key={firstMenu.route}
            aria-expanded={firstMenu.id == firstCategory}
          >
            <Link href={`/${firstMenu.route}`}>
              <div
                className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: firstMenu.id == firstCategory,
                })}
              >
                {firstMenu.icon}
                <span>{firstMenu.name}</span>
              </div>
            </Link>
            {firstMenu.id == firstCategory && buildSecondLevel(firstMenu)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (firstLevelMenu: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map((m) => {
          if (
            m.pages.map((p) => p.alias).includes(router.asPath.split("/")[2])
          ) {
            m.isOpened = true;
          }
          return (
            <li key={m._id.secondCategory}>
              <button
                onKeyDown={(key: KeyboardEvent) =>
                  openSecondLevelKey(key, m._id.secondCategory)
                }
                className={styles.secondLevel}
                onClick={() => openSecondLevel(m._id.secondCategory)}
                aria-expanded={m.isOpened}
              >
                {m._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={m.isOpened ? "visible" : "hidden"}
                animate={m.isOpened ? "visible" : "hidden"}
                className={styles.secondLevelBlock}
              >
                {m.isOpened &&
                  buildThirdLevel(
                    m.pages,
                    firstLevelMenu.route,
                    m.isOpened ?? false
                  )}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpened: boolean
  ) => {
    return pages.map((p) => (
      <motion.li key={p.category} variants={variantsChildren}>
        <Link
          tabIndex={isOpened ? 0 : -1}
          href={`/${route}/${p.alias}`}
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath,
          })}
          aria-current={
            `/${route}/${p.alias}` == router.asPath ? "page" : false
          }
        >
          {p.category}
        </Link>
      </motion.li>
    ));
  };

  return (
    <nav className={styles.menu} role="navigation">
      {announce && (
        <span role="log" className="visually-hidden">
          {announce === "opened" ? "развернуто" : "свернуто"}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  );
};

export default Menu;
