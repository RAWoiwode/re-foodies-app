import React from "react";
import styles from "./loading.module.css";

// Used if you want to cover the entier page with a loading display
const MealsLoadingPage = () => {
  return <p className={styles.loading}>Fetching meals...</p>;
};

export default MealsLoadingPage;
