import { NextResponse } from "next/server";
import { updateTask } from "@/services/tasks/updateTask";
import { deleteTask } from "@/services/tasks/deleteTask";
import { withValidation } from "@/utils/withValidation";
import { taskSchema } from "@/schemas/task.schema";

const putHandler = async (request, context) => {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const updatedTask = await updateTask(id, body);
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
};

export const PUT = withValidation(putHandler, taskSchema);

export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    await deleteTask(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
