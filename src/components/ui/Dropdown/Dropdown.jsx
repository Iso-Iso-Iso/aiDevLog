"use client";
import Select from "react-select";
import styles from "./Dropdown.module.css";
import { useId } from "react";

export const Dropdown = ({ label, options, value, onChange, placeholder }) => {
  // !WARN: quick work-around, wait until It'll be fixed on lib side
  const inputId = useId();
  const instanceId = useId();

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <Select
        inputId={inputId}
        instanceId={instanceId}
        className={styles.select}
        classNamePrefix="react-select"
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isSearchable={false}
      />
    </div>
  );
};
