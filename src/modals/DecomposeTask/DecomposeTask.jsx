import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal/Modal";
import { TextArea } from "@/components/ui/TextArea/TextArea";
import { Button } from "@/components/ui/Button/Button";
import { useSelectModalStoreActions } from "@/stores/modalProviderStore";
import { useDecomposeTaskMutation } from "@/services/tasks/useDecomposeTaskMutation";
import styles from "./DecomposeTask.module.css";

export const DecomposeTask = () => {
  const { resetModal } = useSelectModalStoreActions();
  const { mutate, isPending } = useDecomposeTaskMutation();
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    mutate(prompt, {
      onSuccess: () => {
        resetModal();
      }
    });
  };

  return (
    <Modal title="Generate AI Tasks">
      <div className={styles.container}>
        <TextArea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="E.g., Build a user authentication system with NextAuth..."
          rows={5}
        />
        <div className={styles.actions}>
          <Button variant="outlined" onClick={resetModal} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleGenerate} disabled={isPending || !prompt.trim()}>
            {isPending ? "Generating..." : "Generate Tasks"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
