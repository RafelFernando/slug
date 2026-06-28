import { object, string } from "zod";

export const SignInSchema = object({
    email: string().email("Invalid email"),
    password: string()
        .min(8, "Password must be at least 8 characters long")
        .max(32, "Password must be at most 32 characters long"),
})

export const RegisterSchema = object({
    name: string().min(3, "Name must be at least 3 characters long"),
    email: string().email("Invalid email"),
    password: string()
        .min(8, "Password must be at least 8 characters long")
        .max(32, "Password must be at most 32 characters long"),
    confirmPassword: string()
        .min(8, "Password must be at least 8 characters long")
        .max(32, "Password must be at most 32 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})