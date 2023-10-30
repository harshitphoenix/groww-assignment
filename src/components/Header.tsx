import next from "next";
import SearchBar from "./SearchBar";
import styles from "../styles/Header.module.css";
import { FaMoon, FaSun } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
const Header = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const theme = document.body.style.getPropertyValue('--current-theme') as "light" | "dark";
        setTheme(theme);
    }, [])

  const changeTheme = () => {
    if (typeof window !== "undefined") {
      document.body.classList.toggle("dark");
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  return (
    <div className={styles.container}>
      <Link href={"/"}>
        <h1>Groww Stonks</h1>
      </Link>
      <SearchBar />
      {theme === "dark" ? (
        <FaSun onClick={changeTheme} />
      ) : (
        <FaMoon onClick={changeTheme} />
      )}
    </div>
  );
};

export default Header;
