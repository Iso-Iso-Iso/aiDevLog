export const PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

export const PRIORITY_LABELS = {
  [PRIORITY.LOW]: "Low",
  [PRIORITY.MEDIUM]: "Medium",
  [PRIORITY.HIGH]: "High",
};

export const PRIORITY_OPTIONS = [
  { value: PRIORITY.LOW, label: PRIORITY_LABELS[PRIORITY.LOW] },
  { value: PRIORITY.MEDIUM, label: PRIORITY_LABELS[PRIORITY.MEDIUM] },
  { value: PRIORITY.HIGH, label: PRIORITY_LABELS[PRIORITY.HIGH] },
];
