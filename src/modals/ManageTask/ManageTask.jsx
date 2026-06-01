import React from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/ui/Modal/Modal";
import { FormInput } from "@/components/ui/Input/Input";
import { FormTextArea } from "@/components/ui/TextArea/TextArea";
import { FormDropdown } from "@/components/ui/Dropdown/Dropdown";
import { Button } from "@/components/ui/Button/Button";
import { PRIORITY_OPTIONS } from "@/constants/priority";
import { STATUS_OPTIONS } from "@/constants/status";
import { useSelectModalStoreActions } from "@/stores/modalProviderStore";
import { useCreateTaskMutation } from "@/services/tasks/useCreateTaskMutation";
import { useUpdateTaskMutation } from "@/services/tasks/useUpdateTaskMutation";
import styles from "./ManageTask.module.css";
import { manageTaskResolver, getDefaultValues } from "@/schemas/task.schema";

export const ManageTask = ({ id, title, description, priority, status }) => {
  const { resetModal } = useSelectModalStoreActions();
  const { mutate: createMutate, isPending: isCreating } = useCreateTaskMutation();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateTaskMutation();

  const isPending = isCreating || isUpdating;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: manageTaskResolver,
    defaultValues: getDefaultValues({ title, description, priority, status }),
  });

  const onSubmit = (data) => {
    const options = {
      onSuccess: () => {
        resetModal();
      },
    };

    if (id) {
      updateMutate({ id, ...data }, options);
    } else {
      createMutate(data, options);
    }
  };

  return (
    <Modal title={id ? "Edit Task" : "Create Task"}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.field}>
          <FormInput
            control={control}
            name="title"
            label="Title"
            placeholder="Enter task title"
          />
          {errors.title && (
            <span className={styles.error}>{errors.title.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <FormTextArea
            control={control}
            name="description"
            label="Description"
            placeholder="Enter detailed description"
            rows={4}
          />
          {errors.description && (
            <span className={styles.error}>{errors.description.message}</span>
          )}
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <FormDropdown
              control={control}
              name="priority"
              label="Priority"
              options={PRIORITY_OPTIONS}
              placeholder="Select priority"
            />
            {errors.priority && (
              <span className={styles.error}>{errors.priority.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <FormDropdown
              control={control}
              name="status"
              label="Status"
              options={STATUS_OPTIONS}
              placeholder="Select status"
            />
            {errors.status && (
              <span className={styles.error}>{errors.status.message}</span>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              resetModal();
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Confirm"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
