import clsx from 'clsx';
import styles from './Chip.module.css';

export const Chip = ({ label, variant = "default" }) => {
  return (
    <div className={clsx(styles.chip, styles[variant])}>
      {label}
    </div>
  );
};
