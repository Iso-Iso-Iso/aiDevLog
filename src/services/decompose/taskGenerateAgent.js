import { ChatOpenAI } from "@langchain/openai";
import { createTasksTool } from "./createTaskTool";

const tools = [createTasksTool];

const llm = new ChatOpenAI({
  modelName: "gpt-5.4-mini",
  temperature: 0.4,
});
const llmWithTools = llm.bindTools(tools, { tool_choice: "createTasks" });

const systemPrompt = `You are an expert AI task decomposer and manager.
Your goal is to take a valid software feature request and break it down into specialized, actionable tasks.

CRITICAL DECOMPOSITION RULES:
1. Break down the request across applicable disciplines: Design, FE (Frontend), BE (Backend), QA.
2. DO NOT create monolithic tasks (e.g., a single "Frontend implementation" for an entire website). If the request is complex, split it into smaller, modular features. For example, separate tasks for "Header Component", "Authentication Form", "Routing Setup", etc.
3. Keep descriptions highly detailed and actionable.
4. Assign appropriate priorities (low, medium, high) by evaluating Size, Importance, and Risk Factor. Tasks with large scope, critical importance, or high technical risk (especially foundational or blocking tasks) must be 'high' priority. Small, low-risk, or cosmetic tasks should be 'low' priority.
5. IMPORTANT: All generated tasks, descriptions, and outputs MUST be entirely in English.

You MUST call the 'createTasks' tool exactly ONCE, providing the full array of specialized, granular tasks you identified.`;

const taskGenerateAgent = async (prompt) => {
  const msgs = [
    { role: "system", content: systemPrompt },
    { role: "user", content: prompt },
  ];
  return await llmWithTools.invoke(msgs);
};

export const taskGenerateAgentAdapter = async (state) => {
  const { messages } = state;
  const userMessage = messages.findLast(
    (m) => m.role === "user" || m._getType() === "human",
  );

  const response = await taskGenerateAgent(userMessage.content);
  return { messages: [response] };
};
