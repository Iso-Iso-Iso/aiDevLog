import styles from "./Typography.module.css";

export const Typography = ({ variant = "paragraph", children }) => {
  const variantClass = styles[variant];

  return <span className={variantClass}>{children}</span>;
};
