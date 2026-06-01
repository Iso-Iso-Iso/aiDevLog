import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

const ValidationSchema = z.object({
  isValid: z
    .boolean()
    .describe(
      "True if the input is a valid request to create, manage, or decompose software/to-do tasks.",
    ),
  reason: z
    .string()
    .describe(
      "If isValid is false, explain politely why it is rejected. If isValid is true, leave this as an empty string.",
    ),
});

const llm = new ChatOpenAI({
  modelName: "gpt-5.4-mini",
  temperature: 0,
});

const structuredLlm = llm.withStructuredOutput(ValidationSchema, {
  name: "validate_task_request",
});

const systemPrompt = `You are a strict input validator for an AI task management system.
Determine if the user's input is a valid request for task creation or decomposition.
Reject conversational greetings, nonsense, or questions completely unrelated to software tasks.
IMPORTANT: You MUST respond entirely in English.`;

const validationAgent = async (prompt) => {
  const response = await structuredLlm.invoke([
    { role: "system", content: systemPrompt },
    { role: "user", content: prompt },
  ]);

  return response;
};

export const validationAgentAdapter = async (state) => {
  const { messages } = state;
  const userMessage = messages.findLast(
    (m) => m.role === "user" || m._getType() === "human",
  );

  const validationResult = await validationAgent(userMessage.content);

  if (!validationResult.isValid) {
    return {
      messages: [
        {
          role: "assistant",
          content: validationResult.reason || "Invalid task request.",
        },
      ],
    };
  }

  return {};
};
