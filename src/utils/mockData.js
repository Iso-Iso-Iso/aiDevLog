import { STATUS } from "../constants/status";
import { PRIORITY } from "../constants/priority";

export const generateMockTasks = (count = 100) => {
  const priorities = [PRIORITY.LOW, PRIORITY.MEDIUM, PRIORITY.HIGH];
  const statuses = [
    STATUS.IN_PROGRESS,
    STATUS.DONE,
    STATUS.SELECTED_FOR_DEVELOPMENT,
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `TASK-${i + 1}`,
    title: `Implement Feature ${i + 1}`,
    description: `This is a detailed description for task ${
      i + 1
    }. It might be very long and should be cropped via CSS ellipsis so it doesn't break the layout.`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    createdAt: Date.now() - Math.floor(Math.random() * 10000000000),
  }));
};

export const mockTasks = generateMockTasks(100);
