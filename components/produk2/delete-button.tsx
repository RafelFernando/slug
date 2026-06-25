"use client";

import { deleteProduk2 } from "@/lib/kategori-produk-2/action";
import { useTransition } from "react";

export default function DeleteButtonProduk2({
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
                if (
                    !confirm(
                        "Hapus produk?"
                    )
                )
                    return;

                startTransition(
                    async () => {
                        await deleteProduk2(
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