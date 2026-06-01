"use client";

import { Typography } from "@/components/ui/Typography/Typography";
import { Button } from "@/components/ui/Button/Button";
import styles from "./Header.module.css";
import { useSelectModalStoreActions } from "@/stores/modalProviderStore";

export const Header = () => {
  const { setActiveModal } = useSelectModalStoreActions();

  return (
    <header className={styles.header}>
      <div className={styles.titleSection}>
        <Typography variant="heading">Task Log</Typography>
        <Typography variant="paragraph">
          Manage your tasks and keep track of your progress.
        </Typography>
      </div>
      <div className={styles.actionSection}>
        <Button variant="outlined" onClick={() => setActiveModal("manageTask")}>
          Create task
        </Button>
        <Button
          variant="filled"
          onClick={() => setActiveModal("decomposeTask")}
        >
          AI Task
        </Button>
      </div>
    </header>
  );
};
