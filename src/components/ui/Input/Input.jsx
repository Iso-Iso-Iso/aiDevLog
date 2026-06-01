import { useController } from "react-hook-form";
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

export const FormInput = ({ control, name, label, type, placeholder }) => {
  const {
    field: { value, onChange },
  } = useController({ control, name });

  return (
    <Input
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

