'use server';

import { RegisterSchema, SignInSchema } from "@/lib/auth/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth/auth";
import { AuthError } from "next-auth";


export const SignUpCredentials = async (prevState: unknown, formData: FormData) => {
    const validatedFields = RegisterSchema.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = hashSync(password, 10);

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
    } catch (error) {
        return { message: "Failed to register user" };
    }
    redirect("/login");
}

export const SignInCredentials = async (redirectUrl: string, prevState: unknown, formData: FormData) => {
    const validatedFields = SignInSchema.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: redirectUrl,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { message: "Invalid credentials" };
                default:
                    return { message: "Something went wrong" };
            }
        }
        throw error;
    }
}
