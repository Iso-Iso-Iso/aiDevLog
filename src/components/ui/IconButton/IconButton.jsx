import { Icon } from "../Icon/Icon";
import styles from "./IconButton.module.css";

export const IconButton = ({ name, size = 20, onClick }) => {
  return (
    <button className={styles.iconButton} onClick={onClick}>
      <Icon name={name} size={size} className={styles.icon} />
    </button>
  );
};
