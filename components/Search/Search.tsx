import React, { KeyboardEvent, useState } from "react";
import { SearchProps } from "./Search.props";
import styles from "./Search.module.css";
import cn from "classnames";
import { Input } from "../Input/Input";
import { Button } from "../button/Button";
import SearchIcon from "./search.svg";
import { useRouter } from "next/router";

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const searchStyle = cn(styles.search, className);
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        q: search,
      },
    });
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === "Enter") {
      goToSearch();
    }
  };

  return (
    <form className={searchStyle} {...props} role="search">
      <Input
        className={styles.input}
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        appearance="primary"
        className={styles.button}
        onClick={goToSearch}
        aria-label="Поиск по сайту"
      >
        <SearchIcon />
      </Button>
    </form>
  );
};
