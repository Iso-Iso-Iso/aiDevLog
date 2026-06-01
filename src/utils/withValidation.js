import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const withValidation = (handler, schema) => async (request, context) => {
  try {
    // Clone the request stream so the handler can still read it if needed
    const clone = request.clone();
    const body = await clone.json();

    schema.parse(body);

    return handler(request, context);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation Error", details: error.errors },
        { status: 400 }
      );
    }
    
    console.error("API Validation error:", error);
    return NextResponse.json(
      { error: "Bad Request" },
      { status: 400 }
    );
  }
};
