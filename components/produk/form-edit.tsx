"use client";

import { useActionState, useEffect } from "react";
import { useTopLoader } from "nextjs-toploader";
import { updateProduk } from "@/lib/produk/action";

type Produk = {
    id: string;
    namaProduk: string;
    harga: number;
    stok: number;
};

export default function EditProdukForm({
    produk,
}: {
    produk: Produk;
}) {
    const updateProdukWithId =
        updateProduk.bind(
            null,
            produk.id
        );

    const [state, formAction, isPending] =
        useActionState(
            updateProdukWithId,
            null
        );

    const loader = useTopLoader();

    useEffect(() => {
        if (isPending) {
            loader.start();
        } else {
            loader.done();
        }
    }, [isPending, loader]);

    return (
        <form action={formAction}>
            <input
                type="text"
                name="namaProduk"
                defaultValue={
                    produk.namaProduk
                }
                placeholder="Nama Produk"
            />

            {state?.errors?.namaProduk && (
                <div>
                    {
                        state.errors
                            .namaProduk[0]
                    }
                </div>
            )}

            <input
                type="number"
                name="harga"
                defaultValue={
                    produk.harga
                }
                placeholder="Harga"
            />

            {state?.errors?.harga && (
                <div>
                    {
                        state.errors
                            .harga[0]
                    }
                </div>
            )}

            <input
                type="number"
                name="stok"
                defaultValue={
                    produk.stok
                }
                placeholder="Stok"
            />

            {state?.errors?.stok && (
                <div>
                    {
                        state.errors
                            .stok[0]
                    }
                </div>
            )}

            {state?.message && (
                <div>
                    {state.message}
                </div>
            )}

            <button
                type="submit"
                disabled={isPending}
            >
                {isPending
                    ? "Menyimpan..."
                    : "Update"}
            </button>
        </form>
    );
}