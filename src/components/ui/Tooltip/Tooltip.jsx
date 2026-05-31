'use client';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import styles from './Tooltip.module.css';

export const Tooltip = ({ id, ...props }) => {
  return (
    <ReactTooltip
      id={id}
      className={styles.tooltip}
      {...props}
    />
  );
};
