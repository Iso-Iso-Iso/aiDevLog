import React from "react";
import { Modal } from "@/components/ui/Modal/Modal";
import { Typography } from "@/components/ui/Typography/Typography";
import { Button } from "@/components/ui/Button/Button";
import { useSelectModalStoreActions } from "@/stores/modalProviderStore";
import { useDeleteTaskMutation } from "@/services/tasks/useDeleteTaskMutation";
import styles from "./DeleteTask.module.css";

export const DeleteTask = ({ id }) => {
  const { resetModal } = useSelectModalStoreActions();
  const { mutate, isPending } = useDeleteTaskMutation();

  const handleDelete = () => {
    mutate(id, {
      onSuccess: () => {
        resetModal();
      },
    });
  };

  return (
    <Modal title="Delete Task">
      <div className={styles.container}>
        <Typography variant="paragraph">
          Are you sure you want to delete this task? This action cannot be undone.
        </Typography>
        <div className={styles.actions}>
          <Button variant="outlined" onClick={resetModal}>
            Cancel
          </Button>
          <Button onClick={handleDelete} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
