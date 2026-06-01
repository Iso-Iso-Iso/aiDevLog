import { IconButton } from "../IconButton/IconButton";
import { Typography } from "../Typography/Typography";
import { useSelectModalStoreActions } from "@/stores/modalProviderStore";
import styles from "./Modal.module.css";

export const Modal = ({ title, children }) => {
  const { resetModal } = useSelectModalStoreActions();

  return (
    <div className={styles.overlay} onClick={resetModal}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.header}>
          <Typography variant="title">{title}</Typography>
          <IconButton name="close" onClick={resetModal} />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
