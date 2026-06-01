import { NextResponse } from "next/server";
import { createTask } from "@/services/tasks/createTask";
import { withValidation } from "@/utils/withValidation";
import { withErrorHandler } from "@/utils/withErrorHandler";
import { taskSchema } from "@/schemas/task.schema";

const postHandler = async (request) => {
  const body = await request.json();
  const newTask = await createTask(body);
  return NextResponse.json(newTask, { status: 201 });
};

export const POST = withErrorHandler(withValidation(postHandler, taskSchema));
