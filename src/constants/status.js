export const STATUS = {
  IN_PROGRESS: "in progress",
  DONE: "done",
  SELECTED_FOR_DEVELOPMENT: "selected for development",
};

export const STATUS_LABELS = {
  [STATUS.IN_PROGRESS]: "In Progress",
  [STATUS.DONE]: "Done",
  [STATUS.SELECTED_FOR_DEVELOPMENT]: "Selected for Development",
};

export const STATUS_OPTIONS = [
  { value: STATUS.IN_PROGRESS, label: STATUS_LABELS[STATUS.IN_PROGRESS] },
  { value: STATUS.DONE, label: STATUS_LABELS[STATUS.DONE] },
  { value: STATUS.SELECTED_FOR_DEVELOPMENT, label: STATUS_LABELS[STATUS.SELECTED_FOR_DEVELOPMENT] },
];
