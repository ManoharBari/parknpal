import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userCreateSchema } from "@/lib/validation";
import { errorResponse, successResponse } from "@/lib/response";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = userCreateSchema.parse(body);
    const { name, email, password, phone, role } = validatedData;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse("User already exists", 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: role || "user",
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return successResponse(
      {
        user,
        token,
      },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return errorResponse(error.errors.map((e) => e.message).join(", "), 400);
    }

    console.error("Registration error:", error);
    return errorResponse("Failed to create account", 500);
  }
}
