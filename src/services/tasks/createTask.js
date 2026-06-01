import { getDatabase } from "../database";

export const createTask = async (taskData) => {
  const db = await getDatabase();
  const newTask = {
    id: Date.now().toString(),
    createdAt: Date.now(),
    ...taskData,
  };

  db.data.tasks.push(newTask);
  await db.write();
  await db.read();
  console.log(db.data.tasks);

  return newTask;
};
