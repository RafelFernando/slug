"use client";

import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useTopLoader } from "nextjs-toploader";

export const RegisterButton = () => {
    const { pending } = useFormStatus();
    const { start, done } = useTopLoader();

    useEffect(() => {
        if (pending) {
            start();
        } else {
            done();
        }
    }, [pending, start, done]);

    return (
        <button
            type="submit"
            disabled={pending}
            className="cursor-pointer w-full bg-blue-700 text-white px-5 py-2.5 font-medium rounded-lg text-center uppercase hover:bg-blue-800 disabled:opacity-50"
        >
            {pending ? "Registering..." : "Register"}
        </button>
    );
};

export const LoginButton = () => {
    const { pending } = useFormStatus();
    const { start, done } = useTopLoader();

    useEffect(() => {
        if (pending) {
            start();
        } else {
            done();
        }
    }, [pending, start, done]);

    return (
        <button
            type="submit"
            disabled={pending}
            className="cursor-pointer w-full bg-blue-700 text-white px-5 py-2.5 font-medium rounded-lg text-center uppercase hover:bg-blue-800 disabled:opacity-50"
        >
            {pending ? "Authenticating..." : "Sign In"}
        </button>
    );
};