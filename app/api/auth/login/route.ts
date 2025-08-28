import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorResponse, successResponse } from "@/lib/response";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        phone: true,
        role: true,
      },
    });

    if (!user) {
      return errorResponse("Invalid credentials", 401);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return errorResponse("Invalid credentials", 401);
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return successResponse({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return errorResponse(error.errors.map((e) => e.message).join(", "), 400);
    }
    console.error("Login error:", error);
    return errorResponse("Login failed", 500);
  }
}
