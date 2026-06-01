import * as z from "zod";

export const decomposeTaskSchema = z.object({
  prompt: z.string().min(5, "Prompt must be at least 5 characters long"),
});
