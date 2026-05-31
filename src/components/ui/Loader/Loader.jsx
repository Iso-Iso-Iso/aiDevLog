import React from "react";
import styles from "./Loader.module.css";

export const Loader = ({ size = "md" }) => {
  return (
    <div className={styles.loaderContainer} role="status" aria-label="loading">
      <div className={`${styles.spinner} ${styles[size]}`} />
    </div>
  );
};

export default Loader;
