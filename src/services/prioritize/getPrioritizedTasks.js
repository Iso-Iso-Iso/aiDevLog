"use server";

import { getDatabase } from "../database";
import { STATUS } from "@/constants/status";
import { taskPrioritizerGraph } from "@/agent/taskPrioritizer";

export const getPrioritizedTasks = async () => {
  const db = await getDatabase();
  const tasks = db.data.tasks.filter(
    (t) => t.status === STATUS.SELECTED_FOR_DEVELOPMENT,
  );

  if (tasks.length === 0) {
    return {
      dailyPlan: [],
      recommendations:
        "No tasks selected for development. Please move some tasks to 'Selected for Development' to generate a plan.",
      bottlenecks: "None",
    };
  }

  const state = await taskPrioritizerGraph.invoke({ tasks });

  return {
    dailyPlan: state.plan || [],
    recommendations: state.recommendations || "",
    bottlenecks: state.bottlenecks || "",
  };
};
