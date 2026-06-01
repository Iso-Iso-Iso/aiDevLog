import styles from "./Button.module.css";

import clsx from "clsx";

export const Button = ({ children, onClick, variant = "filled" }) => {
  return (
    <button
      className={clsx(styles.button, styles[variant])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
