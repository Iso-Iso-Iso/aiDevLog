import { NextResponse } from "next/server";
import { updateTask } from "@/services/tasks/updateTask";
import { deleteTask } from "@/services/tasks/deleteTask";
import { withValidation } from "@/utils/withValidation";
import { withErrorHandler } from "@/utils/withErrorHandler";
import { taskSchema } from "@/schemas/task.schema";

const putHandler = async (request, context) => {
  const { id } = await context.params;
  const body = await request.json();
  const updatedTask = await updateTask(id, body);
  return NextResponse.json(updatedTask, { status: 200 });
};

export const PUT = withErrorHandler(withValidation(putHandler, taskSchema));

const deleteHandler = async (_, context) => {
  const { id } = await context.params;
  await deleteTask(id);
  return NextResponse.json({ success: true }, { status: 200 });
};

export const DELETE = withErrorHandler(deleteHandler);
