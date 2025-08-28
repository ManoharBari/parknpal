// lib/validations.ts - Input validation schemas
import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  phone: z.string().optional(),
  role: z.enum(["user", "owner"]).optional(),
});

export const parkingSpotSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  price: z.number().positive("Price must be positive"),
  features: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});

export const bookingSchema = z
  .object({
    parkingSpotId: z.string().min(1, "Parking spot ID is required"),
    vehicleId: z.string().min(1, "Vehicle ID is required"),
    startTime: z.string().datetime("Invalid start time"),
    endTime: z.string().datetime("Invalid end time"),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "End time must be after start time",
    path: ["endTime"],
  });

export const vehicleSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  color: z.string().min(1, "Color is required"),
  license: z.string().min(1, "License plate is required"),
});

export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().optional(),
  parkingSpotId: z.string().min(1),
  bookingId: z.string().min(1),
});
