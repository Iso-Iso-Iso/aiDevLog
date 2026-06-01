import { useController } from "react-hook-form";
import styles from './TextArea.module.css';

export const TextArea = ({ label, value, onChange, placeholder, rows = 4 }) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        className={styles.textarea}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
};

export const FormTextArea = ({ control, name, label, placeholder, rows }) => {
  const {
    field: { value, onChange },
  } = useController({ control, name });

  return (
    <TextArea
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
    />
  );
};
