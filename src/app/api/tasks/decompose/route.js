import { NextResponse } from "next/server";
import { taskGeneratorGraph } from "@/agent/taskGenerator";
import { withValidation } from "@/utils/withValidation";
import { withErrorHandler } from "@/utils/withErrorHandler";
import { decomposeTaskSchema } from "@/schemas/decomposeTask.schema";

const postHandler = async (request) => {
  const { prompt } = await request.json();

  const state = await taskGeneratorGraph.invoke({
    messages: [{ role: "user", content: prompt }],
  });

  const messages = state.messages;
  const finalMessage = messages.at(-1);

  const toolsCalled = messages.some(
    (m) => m.tool_calls && m.tool_calls.length > 0,
  );

  if (!toolsCalled) {
    return NextResponse.json(
      { error: finalMessage.content || "Invalid task description" },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { success: true, message: "Tasks created successfully!" },
    { status: 201 },
  );
};

export const POST = withErrorHandler(
  withValidation(postHandler, decomposeTaskSchema),
);
