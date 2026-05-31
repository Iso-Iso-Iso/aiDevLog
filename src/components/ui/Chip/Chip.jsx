import styles from './Chip.module.css';

export const Chip = ({ label }) => {
  return (
    <div className={styles.chip}>
      {label}
    </div>
  );
};
