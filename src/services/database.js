import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import path from "path";

const dbPath = path.join(process.cwd(), "db.json");

const adapter = new JSONFile(dbPath);

const defaultData = { tasks: [] };

let db = null;

export const getDatabase = async () => {
  if (!db) {
    db = new Low(adapter, defaultData);
    await db.read();

    db.data ||= defaultData;
    await db.write();
  }

  await db.read();
  return db;
};
