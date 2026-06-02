import React from "react";
import { Modal } from "@/components/ui/Modal/Modal";
import { Button } from "@/components/ui/Button/Button";
import { useSelectModalStoreActions } from "@/stores/modalProviderStore";
import { usePrioritizedTasksQuery } from "@/services/prioritize/usePrioritizedTasksQuery";
import { Typography } from "@/components/ui/Typography/Typography";
import { Loader } from "@/components/ui/Loader/Loader";
import styles from "./PrioritizeTask.module.css";

export const PrioritizeTask = () => {
  const { resetModal } = useSelectModalStoreActions();
  const { data, isPending, isFetching, isError } = usePrioritizedTasksQuery();

  const isShowLoader = isPending || isFetching;

  return (
    <Modal title="AI Daily Prioritization">
      <div className={styles.container}>
        {isShowLoader && (
          <div className={styles.loading}>
            <Loader size="md" />
            <Typography variant="paragraph">
              Analyzing tasks and creating a daily plan...
            </Typography>
          </div>
        )}

        {isError && (
          <div className={styles.error}>
            <Typography variant="paragraph">
              Failed to generate the daily plan. Please try again.
            </Typography>
          </div>
        )}

        {data && !isShowLoader && (
          <div className={styles.content}>
            <div className={styles.section}>
              <Typography variant="title">Daily Plan</Typography>
              {data.dailyPlan.length === 0 ? (
                <Typography variant="paragraph">
                  No tasks selected for development.
                </Typography>
              ) : (
                <ul className={styles.taskList}>
                  {data.dailyPlan.map((task) => (
                    <li key={task.taskId} className={styles.taskItem}>
                      <div className={styles.taskHeader}>
                        <span className={styles.taskTitle}>{task.title}</span>
                        <span className={styles.taskEstimate}>
                          {task.estimate}
                        </span>
                      </div>
                      <div className={styles.reasonWrapper}>
                        <Typography variant="paragraph">
                          {task.reason}
                        </Typography>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className={styles.section}>
              <Typography variant="title">Recommendations</Typography>
              <Typography variant="paragraph">
                {data.recommendations}
              </Typography>
            </div>

            <div className={styles.section}>
              <Typography variant="title">Bottlenecks & Risks</Typography>
              <Typography variant="paragraph">{data.bottlenecks}</Typography>
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <Button variant="outlined" onClick={resetModal}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
