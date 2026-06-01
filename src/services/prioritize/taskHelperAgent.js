import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

const llm = new ChatOpenAI({
  modelName: "gpt-5.4-mini",
  temperature: 0.3,
});

const helperSchema = z.object({
  recommendations: z.string().describe("Strategic advice on what to focus on and why"),
  bottlenecks: z.string().describe("Potential blocking issues or risks based on the selected tasks"),
});

const structuredLlm = llm.withStructuredOutput(helperSchema, { name: "HelperAnalysis", strict: true });

const systemPrompt = `You are a Senior Engineering Manager.
Review the proposed daily plan of tasks. Provide brief, actionable recommendations on what to focus on and analyze any potential bottlenecks or risks in the chosen plan.`;

const taskHelperAgent = async (plan, allTasks) => {
  const msgs = [
    { role: "system", content: systemPrompt },
    { role: "user", content: `Here is the proposed daily plan:\n${JSON.stringify(plan, null, 2)}\n\nHere were the remaining tasks available:\n${JSON.stringify(allTasks, null, 2)}\n\nProvide recommendations and bottleneck analysis.` },
  ];
  return await structuredLlm.invoke(msgs);
};

export const taskHelperAgentAdapter = async (state) => {
  const { tasks, plan } = state;
  const result = await taskHelperAgent(plan, tasks);
  return { recommendations: result.recommendations, bottlenecks: result.bottlenecks };
};
