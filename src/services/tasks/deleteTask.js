import { getDatabase } from "../database";

export const deleteTask = async (id) => {
  const db = await getDatabase();
  const initialLength = db.data.tasks.length;
  db.data.tasks = db.data.tasks.filter((t) => t.id !== id);
  
  if (db.data.tasks.length === initialLength) {
    throw new Error("Task not found");
  }
  
  await db.write();
  return true;
};
