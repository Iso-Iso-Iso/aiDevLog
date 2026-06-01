import { v4 as uuidv4 } from "uuid";
import { getDatabase } from "../database";

export const createTask = async (taskData) => {
  const db = await getDatabase();
  const newTask = {
    id: uuidv4(),
    createdAt: Date.now(),
    ...taskData,
  };

  db.data.tasks.push(newTask);
  await db.write();
  await db.read();

  return newTask;
};
