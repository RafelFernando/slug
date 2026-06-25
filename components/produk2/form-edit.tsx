"use client";

import { useActionState, useEffect } from "react";
import { updateProduk2 } from "@/lib/kategori-produk-2/action";
import { useTopLoader } from "nextjs-toploader";

export default function EditFormProduk2({
    produk,
    kategori,
}: {
    produk: {
        id: string;
        namaProduk: string;
        harga: number;
        stok: number;
        kategoriId: string;
    };
    kategori: {
        id: string;
        namaKategori: string;
    }[];
}) {
    const updateProdukWithId =
        updateProduk2.bind(
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
            />
            <p>{state?.errors?.namaProduk}</p>

            <input
                type="number"
                name="harga"
                defaultValue={
                    produk.harga
                }
            />
            <p>{state?.errors?.harga}</p>

            <input
                type="number"
                name="stok"
                defaultValue={
                    produk.stok
                }
            />
            <p>{state?.errors?.stok}</p>

            <select
                name="kategoriId"
                defaultValue={
                    produk.kategoriId
                }
            >
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
            <p>{state?.errors?.kategoriId}</p>

            <button
                type="submit"
                disabled={isPending}
            >
                Update
            </button>
        </form>
    );
}