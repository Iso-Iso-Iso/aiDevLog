import { getDatabase } from "../database";

export const updateTask = async (id, taskData) => {
  const db = await getDatabase();
  const taskIndex = db.data.tasks.findIndex((t) => t.id === id);
  if (taskIndex === -1) throw new Error("Task not found");
  
  const updatedTask = {
    ...db.data.tasks[taskIndex],
    ...taskData,
  };
  
  db.data.tasks[taskIndex] = updatedTask;
  await db.write();
  return updatedTask;
};
