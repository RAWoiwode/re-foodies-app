"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";
import styles from "./nav-link.module.css";

const NavLink = ({ href, children }) => {
  const path = usePathname();
  return (
    <Link
      href={href}
      className={`${styles.link} ${path.startsWith(href) && styles.active}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
