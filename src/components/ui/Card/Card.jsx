import styles from './Card.module.css';

export const Card = ({ children, title }) => {
  return (
    <div className={styles.card}>
      {title && <div className={styles.header}>{title}</div>}
      <div className={styles.body}>
        {children}
      </div>
    </div>
  );
};
