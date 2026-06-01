"use client";
import Select from "react-select";
import { useId } from "react";
import { useController } from "react-hook-form";
import styles from "./Dropdown.module.css";

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

export const FormDropdown = ({ control, name, label, options, placeholder }) => {
  const {
    field: { value, onChange },
  } = useController({ control, name });

  return (
    <Dropdown
      label={label}
      value={options.find((opt) => opt.value === value) || null}
      onChange={(selected) => onChange(selected ? selected.value : null)}
      options={options}
      placeholder={placeholder}
    />
  );
};
