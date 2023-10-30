import next from "next";
import SearchBar from "./SearchBar";
import styles from "../styles/Header.module.css";
import { FaMoon, FaSun } from "react-icons/fa";
const Header = () => {
  const changeTheme = () => {
    if (typeof window !== "undefined") {
      document.body.classList.toggle("dark");
    }
  };

  return (
    // <header>
      <div className={styles.container}>
        <h1>Groww Stonks</h1>
        <SearchBar />
        {/* <button>Change Theme</button> */}
        {}
        <FaSun onClick={changeTheme} />
        <FaMoon onClick={changeTheme} />
      </div>
    // </header>
  );
};

export default Header;
