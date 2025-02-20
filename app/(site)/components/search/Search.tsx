"use client";
import React, { KeyboardEvent } from "react";
import { Button, Input } from "@/components";
import styles from "./Search.module.css";
import { SearchProps } from "./Search.props";
import cn from "classnames";
import { useState } from "react";
import GlassIcon from "./glass.svg";
import { useRouter } from "next/navigation";

export const Search = ({ className, ...props }: SearchProps) => {
  const [search, setSearch] = useState<string>("");
  const route = useRouter();

  const goToSearch = () => {
    route.push(`/search/${search}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      goToSearch();
    }
  };

  return (
    <form className={cn(className, styles.search)} {...props} role="search">
      <Input
        className={styles.input}
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        appearence="primary"
        className={styles.button}
        onClick={goToSearch}
        aria-label="Искать по сайту"
      >
        <GlassIcon />
      </Button>
    </form>
  );
};
