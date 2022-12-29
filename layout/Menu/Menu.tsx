import React, { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";
import styles from "./Menu.module.css";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { firstLevelMenu } from "../../helpers/helpers";

const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const router = useRouter();

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory === secondCategory) {
            m.isOpened = !m.isOpened;
          }
          return m;
        })
      );
  };

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((firstMenu) => (
          <div key={firstMenu.route}>
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
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (firstLevelMenu: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((m) => {
          if (
            m.pages.map((p) => p.alias).includes(router.asPath.split("/")[2])
          ) {
            m.isOpened = true;
          }
          return (
            <div key={m._id.secondCategory}>
              <div
                className={styles.secondLevel}
                onClick={() => openSecondLevel(m._id.secondCategory)}
              >
                {m._id.secondCategory}
              </div>
              <div
                className={cn(styles.secondLevelBlock, {
                  [styles.secondLevelBlockOpened]: m.isOpened,
                })}
              >
                {m.isOpened && buildThirdLevel(m.pages, firstLevelMenu.route)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string) => {
    return pages.map((p) => (
      <Link
        key={p.category}
        href={`/${route}/${p.alias}`}
        className={cn(styles.thirdLevel, {
          [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath,
        })}
      >
        {p.category}
      </Link>
    ));
  };

  return <div className={styles.menu}>{buildFirstLevel()}</div>;
};

export default Menu;
