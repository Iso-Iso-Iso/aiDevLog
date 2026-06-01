import { NextResponse } from "next/server";
import { createTask } from "@/services/tasks/createTask";
import { withValidation } from "@/utils/withValidation";
import { taskSchema } from "@/schemas/task.schema";

const postHandler = async (request) => {
  try {
    const body = await request.json();
    const newTask = await createTask(body);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
};

export const POST = withValidation(postHandler, taskSchema);
