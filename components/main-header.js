import Link from "next/link";
import logo from "@/assets/logo.png";
import React from "react";
import styles from "./main-header.module.css";

const MainHeader = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href={"/"}>
        <img src={logo.src} alt="Plate with food" />
        NextLevel Food
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href={"/meals"}>Browse Meals</Link>
          </li>
          <li>
            <Link href={"/community"}>Foodies Community</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
