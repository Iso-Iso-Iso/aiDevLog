import styles from './Input.module.css';

export const Input = ({ label, value, onChange, placeholder, type = 'text' }) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
