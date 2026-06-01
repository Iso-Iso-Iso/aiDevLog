import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import { taskFilterAgentAdapter } from "@/services/prioritize/taskFilterAgent";
import { taskHelperAgentAdapter } from "@/services/prioritize/taskHelperAgent";

export const PrioritizerStateAnnotation = Annotation.Root({
  tasks: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  plan: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  recommendations: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  bottlenecks: Annotation({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
});

const builder = new StateGraph(PrioritizerStateAnnotation)
  .addNode("filter", taskFilterAgentAdapter)
  .addNode("helper", taskHelperAgentAdapter)
  .addEdge(START, "filter")
  .addEdge("filter", "helper")
  .addEdge("helper", END);

export const taskPrioritizerGraph = builder.compile();
