import React from "react";
import { SidebarProps } from "./Sidebar.props";
import styles from "./Sidebar.module.css";
import Menu from "../Menu/Menu";
import Logo from "../logo.svg";
import cn from "classnames";
import { Search } from "../../components";

const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  const sidebarStyle = cn(className, styles.sidebar);
  return (
    <div className={sidebarStyle} {...props}>
      <Logo className={styles.logo} />
      <Search />
      <Menu />
    </div>
  );
};

export default Sidebar;
