import {
  StateGraph,
  MessagesAnnotation,
  START,
  END,
} from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { validationAgentAdapter } from "@/services/decompose/validationAgent";
import { taskGenerateAgentAdapter } from "@/services/decompose/taskGenerateAgent";
import { createTasksTool } from "@/services/decompose/createTaskTool";

const toolNode = new ToolNode([createTasksTool]);

const shouldGenerate = (state) => {
  const { messages } = state;
  const lastMessage = messages[messages.length - 1];

  if (lastMessage.role === "assistant" || lastMessage._getType?.() === "ai") {
    return END;
  }

  return "generate";
};

const shouldContinueToTools = (state) => {
  const { messages } = state;
  const lastMessage = messages[messages.length - 1];

  if (lastMessage.tool_calls?.length) {
    return "tools";
  }
  return END;
};

const builder = new StateGraph(MessagesAnnotation)
  .addNode("validate", validationAgentAdapter)
  .addNode("generate", taskGenerateAgentAdapter)
  .addNode("tools", toolNode)
  .addEdge(START, "validate")
  .addConditionalEdges("validate", shouldGenerate)
  .addConditionalEdges("generate", shouldContinueToTools)
  .addEdge("tools", END);

export const taskGeneratorGraph = builder.compile();
