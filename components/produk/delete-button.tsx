"use client";

import { deleteProduk } from "@/lib/produk/action";
import { useTransition } from "react";

export default function DeleteButton({
    id,
}: {
    id: string;
}) {
    const [isPending, startTransition] =
        useTransition();

    return (
        <button
            disabled={isPending}
            onClick={() => {
                const confirmDelete =
                    window.confirm(
                        "Hapus produk?"
                    );

                if (
                    !confirmDelete
                )
                    return;

                startTransition(
                    async () => {
                        await deleteProduk(
                            id
                        );
                    }
                );
            }}
        >
            {isPending
                ? "Menghapus..."
                : "Hapus"}
        </button>
    );
}