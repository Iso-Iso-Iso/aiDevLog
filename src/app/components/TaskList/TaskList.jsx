"use client";

import { useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Dropdown } from "@/components/ui/Dropdown/Dropdown";
import { Chip } from "@/components/ui/Chip/Chip";
import { IconButton } from "@/components/ui/IconButton/IconButton";
import { Button } from "@/components/ui/Button/Button";
import { Loader } from "@/components/ui/Loader/Loader";
import { useGetTasksQuery } from "@/services/tasks/useGetTasksQuery";
import { STATUS_LABELS, STATUS } from "@/constants/status";
import { PRIORITY_LABELS, PRIORITY } from "@/constants/priority";
import { useSelectModalStoreActions } from "@/stores/modalProviderStore";
import styles from "./TaskList.module.css";

const SORT_OPTIONS = [
  { value: "createdAt", label: "Time Creation" },
  { value: "priority", label: "Priority" },
];

const ORDER_OPTIONS = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

const STATUS_VARIANT_MAP = {
  [STATUS.DONE]: "success",
  [STATUS.IN_PROGRESS]: "info",
};

const PRIORITY_VARIANT_MAP = {
  [PRIORITY.HIGH]: "danger",
  [PRIORITY.MEDIUM]: "warning",
};

export const TaskList = () => {
  const { setActiveModal } = useSelectModalStoreActions();
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [sortOrder, setSortOrder] = useState(ORDER_OPTIONS[1]);

  const { data: sortedTasks = [], isLoading } = useGetTasksQuery({
    sortBy: sortBy.value,
    sortOrder: sortOrder.value,
  });

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: sortedTasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
    initialRect: {
      width: 0,
      height: 640,
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <Dropdown
          label="Sort By"
          options={SORT_OPTIONS}
          value={sortBy}
          onChange={setSortBy}
        />
        <Dropdown
          label="Order"
          options={ORDER_OPTIONS}
          value={sortOrder}
          onChange={setSortOrder}
        />
        <Button onClick={() => setActiveModal("prioritizeTask")}>
          AI Prioritization
        </Button>
      </div>

      <div ref={parentRef} className={styles.scrollArea}>
        {isLoading ? (
          <div className={styles.loaderWrapper}>
            <Loader size="lg" />
          </div>
        ) : (
          <div
            className={styles.virtualList}
            style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const task = sortedTasks[virtualRow.index];
              return (
                <div
                  key={task.id}
                  className={styles.row}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <div className={styles.cellTitle}>{task.title}</div>
                  <div className={styles.cellDescription}>
                    <span className={styles.ellipsisText}>
                      {task.description}
                    </span>
                  </div>
                  <div className={styles.cellStatus}>
                    <Chip
                      label={STATUS_LABELS[task.status]}
                      variant={STATUS_VARIANT_MAP[task.status] || "default"}
                    />
                  </div>
                  <div className={styles.cellPriority}>
                    <Chip
                      label={PRIORITY_LABELS[task.priority]}
                      variant={PRIORITY_VARIANT_MAP[task.priority] || "default"}
                    />
                  </div>
                  <div className={styles.cellAction}>
                    <IconButton
                      name="delete"
                      onClick={() =>
                        setActiveModal("deleteTask", { id: task.id })
                      }
                    />
                    <IconButton
                      name="arrowForward"
                      onClick={() => setActiveModal("manageTask", task)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
