import { NextResponse } from "next/server";

export const withErrorHandler = (handler) => async (request, context) => {
  try {
    return await handler(request, context);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.status || 500 }
    );
  }
};
