"use client";

import { useActionState, useEffect } from "react";
import { saveProduk } from "@/lib/produk/action";
import { useTopLoader } from "nextjs-toploader";
import clsx from "clsx";
import Link from "next/link";

export default function FormProduk() {
    const [state, formAction, isPending] = useActionState(saveProduk, null);

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
                placeholder="Nama Produk"
            />

            {state?.errors?.namaProduk}

            <input
                type="number"
                name="harga"
                placeholder="Harga"
            />

            {state?.errors?.harga}

            <input
                type="number"
                name="stok"
                placeholder="Stok"
            />

            {state?.errors?.stok}

            <button type="submit">
                Simpan
            </button>
        </form>
    );
}