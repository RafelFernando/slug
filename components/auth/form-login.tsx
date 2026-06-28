"use client";

import { SignInCredentials } from "@/lib/auth/action";
import { useFormState } from "react-dom";
import { LoginButton } from "@/components/auth/button";

export default function FormLogin({
    redirect_url,
}: {
    redirect_url: string;
}) {
    const signInAction = SignInCredentials.bind(
        null,
        redirect_url
    );

    const [state, formAction] = useFormState(
        signInAction,
        null
    );

    return (
        <form action={formAction} className="space-y-6">
            {state?.message && (
                <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
                    role="alert"
                >
                    <span className="font-medium">
                        {state.message}
                    </span>
                </div>
            )}

            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Email
                </label>

                <input
                    type="email"
                    name="email"
                    placeholder="Masukkan email..."
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
                />

                <span className="text-sm text-red-500">
                    {state?.error?.email}
                </span>
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Password
                </label>

                <input
                    type="password"
                    name="password"
                    placeholder="********"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
                />

                <span className="text-sm text-red-500">
                    {state?.error?.password}
                </span>
            </div>

            <LoginButton />
        </form>
    );
}