import React from "react";
import styles from "./NoData.module.css";
import { Icon } from "../Icon/Icon";

export const NoData = ({
  title = "No Records Found",
  message = "There is currently no information available to display here.",
}) => {
  return (
    <div className={styles.noData} role="presentation">
      <div className={styles.icon}>
        <Icon name="info" size={36} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default NoData;


