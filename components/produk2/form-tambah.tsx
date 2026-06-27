"use client";

import { useActionState, useEffect } from "react";
import { saveProduk2 } from "@/lib/kategori-produk-2/action";
import { useTopLoader } from "nextjs-toploader";
import { PutBlobResult } from "@vercel/blob";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";

export default function FormTambahProduk2({
    kategori,
}: {
    kategori: {
        id: string;
        namaKategori: string;
    }[];
}) {


    const inputFileRef =
        useRef<HTMLInputElement>(null);

    const [images, setImages] =
        useState<PutBlobResult[]>([]);

    const [pendingUpload, startTransition] =
        useTransition();

    const [state, formAction, isPending] =
        useActionState(
            saveProduk2.bind(
                null,
                images.map((i) => i.url)
            ),
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

    const handleUpload = () => {
        if (!inputFileRef.current?.files)
            return;

        const files =
            Array.from(
                inputFileRef.current.files
            );

        startTransition(async () => {
            const uploaded: PutBlobResult[] =
                [];

            for (const file of files) {
                const formData =
                    new FormData();

                formData.append(
                    "file",
                    file
                );

                const response =
                    await fetch(
                        "/api/upload",
                        {
                            method:
                                "PUT",
                            body: formData,
                        }
                    );

                if (
                    response.ok
                ) {
                    uploaded.push(
                        await response.json()
                    );
                }
            }

            setImages((prev) => [
                ...prev,
                ...uploaded,
            ]);
        });
    };

    const deleteImage = (
        url: string
    ) => {
        startTransition(async () => {
            await fetch(
                `/api/upload?url=${encodeURIComponent(
                    url
                )}`,
                {
                    method:
                        "DELETE",
                }
            );

            setImages((prev) =>
                prev.filter(
                    (item) =>
                        item.url !==
                        url
                )
            );
        });
    };

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

            <input
                ref={inputFileRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleUpload}
            />

            <div className="grid grid-cols-4 gap-4 mt-4">

                {images.map((image) => (

                    <div
                        key={image.url}
                        className="relative"
                    >

                        <Image
                            src={image.url}
                            alt=""
                            width={150}
                            height={150}
                            className="rounded-md object-cover"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                deleteImage(
                                    image.url
                                )
                            }
                            className="absolute top-1 right-1 bg-red-500 text-white px-2 rounded"
                        >
                            X
                        </button>

                    </div>

                ))}

            </div>

            {pendingUpload && <p>Loading...</p>}

            <button
                type="submit"
                disabled={isPending}
            >
                Simpan
            </button>
        </form>
    );
}