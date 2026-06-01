import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { createTask } from "@/services/tasks/createTask";

export const createTasksTool = tool(
  async ({ tasks }) => {
    try {
      const created = [];
      for (const task of tasks) {
        const newTask = await createTask({
          title: task.title,
          description: task.description,
          priority: task.priority,
          status: task.status,
        });
        created.push(newTask.title);
      }
      return `Successfully created tasks: ${created.join(", ")}`;
    } catch (e) {
      return `Failed to create tasks: ${e.message}`;
    }
  },
  {
    name: "createTasks",
    description: "Creates multiple new tasks in the database at once.",
    schema: z.object({
      tasks: z
        .array(
          z.object({
            title: z.string().describe("A concise, clear title for the task."),
            description: z
              .string()
              .describe(
                "A detailed description of what needs to be done. Include the required developer role (e.g. BE, FE, Design, QA).",
              ),
            priority: z
              .enum(["low", "medium", "high"])
              .describe("The priority of the task."),
            status: z
              .enum(["in progress", "done", "selected for development"])
              .describe("The status of the task."),
          }),
        )
        .describe(
          "An array of tasks to create. You need to decompose tasks by responsibility and features and then create for different roles. If you see that task is huge and need to be done by several specialists, create separate tasks for each specialist.",
        ),
    }),
  },
);
