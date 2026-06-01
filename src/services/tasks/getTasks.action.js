"use server";

import { getDatabase } from "../database";
import { PRIORITY } from "@/constants/priority";

export const getTasksAction = async (params = {}) => {
  const { sortBy = "createdAt", sortOrder = "desc" } = params;
  const db = await getDatabase();

  const tasks = [...db.data.tasks];

  return tasks.sort((a, b) => {
    let comparison = 0;
    if (sortBy === "createdAt") {
      comparison = a.createdAt - b.createdAt;
    } else if (sortBy === "priority") {
      const priorityScore = {
        [PRIORITY.LOW]: 1,
        [PRIORITY.MEDIUM]: 2,
        [PRIORITY.HIGH]: 3,
      };
      comparison = priorityScore[a.priority] - priorityScore[b.priority];
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });
};
