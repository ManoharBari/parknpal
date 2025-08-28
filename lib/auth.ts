import { NextRequest } from "next/server";

export async function getUserFromAuth(request: NextRequest) {
  // Implement your auth logic here
  // This could be JWT, session, or any auth method you're using
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    throw new Error("No authorization header");
  }

  // Extract user ID from your auth system
  const userId = authHeader.replace("Bearer ", "");
  return userId;
}
