import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

const llm = new ChatOpenAI({
  modelName: "gpt-5.4-mini",
  temperature: 0.2,
});

const planSchema = z.object({
  plan: z.array(
    z.object({
      taskId: z.string().describe("The exact ID of the task"),
      title: z.string().describe("The title of the task"),
      estimate: z.string().describe("Time estimate (e.g., '2h', '30m')"),
      reason: z.string().describe("Reason for including it in today's plan"),
    })
  ).describe("Array of tasks selected for the daily plan"),
});

const structuredLlm = llm.withStructuredOutput(planSchema, { name: "DailyPlan", strict: true });

const systemPrompt = `You are an expert Agile Scrum Master.
Your goal is to review a list of tasks that are ready for development and select a realistic, balanced set of tasks to form a daily plan.
For each selected task, provide a time estimate and a brief reason why it was prioritized.
IMPORTANT: All output MUST be entirely in English.`;

const taskFilterAgent = async (tasks) => {
  const msgs = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Here are the available tasks:\n${JSON.stringify(tasks, null, 2)}\nCreate a daily plan.` },
  ];
  return await structuredLlm.invoke(msgs);
};

export const taskFilterAgentAdapter = async (state) => {
  const { tasks } = state;
  const result = await taskFilterAgent(tasks);
  return { plan: result.plan };
};
