import { getUserFromAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { errorResponse, successResponse } from "@/lib/response";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No authorization token provided");
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return successResponse(user, 200);
  } catch (error) {
    return errorResponse("Unauthorized", 401);
  }
}
