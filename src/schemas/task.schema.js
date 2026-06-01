import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PRIORITY } from "@/constants/priority";
import { STATUS } from "@/constants/status";

export const taskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(10, "Description must be at least 10 characters long"),
  priority: z.nativeEnum(PRIORITY, { errorMap: () => ({ message: "Priority is required" }) }),
  status: z.nativeEnum(STATUS, { errorMap: () => ({ message: "Status is required" }) }),
});

export const manageTaskResolver = zodResolver(taskSchema);

export const getDefaultValues = (task) => ({
  title: task?.title || "",
  description: task?.description || "",
  priority: task?.priority || PRIORITY.MEDIUM,
  status: task?.status || STATUS.SELECTED_FOR_DEVELOPMENT,
});
