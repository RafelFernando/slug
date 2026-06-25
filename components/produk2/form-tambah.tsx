"use client";

import { useActionState, useEffect } from "react";
import { saveProduk2 } from "@/lib/kategori-produk-2/action";
import { useTopLoader } from "nextjs-toploader";

export default function FormTambahProduk2({
    kategori,
}: {
    kategori: {
        id: string;
        namaKategori: string;
    }[];
}) {
    const [state, formAction, isPending] =
        useActionState(
            saveProduk2,
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

            <select
                name="kategoriId"
                defaultValue=""
            >
                <option value="">
                    Pilih Kategori
                </option>

                {kategori.map((item) => (
                    <option
                        key={item.id}
                        value={item.id}
                    >
                        {
                            item.namaKategori
                        }
                    </option>
                ))}
            </select>

            {state?.errors?.kategoriId}

            <button
                type="submit"
                disabled={isPending}
            >
                Simpan
            </button>
        </form>
    );
}