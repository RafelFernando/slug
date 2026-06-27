"use client";
import {
    useActionState,
    useEffect,
    useRef,
    useState,
    useTransition,
} from "react";
import { updateProduk2 } from "@/lib/kategori-produk-2/action";
import { useTopLoader } from "nextjs-toploader";
import { PutBlobResult } from "@vercel/blob";
import Image from "next/image";

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
        images: {
            id: string;
            imageUrl: string;
        }[];
    };
    kategori: {
        id: string;
        namaKategori: string;
    }[];
}) {
    const [pendingUpload, startTransition] =
        useTransition();

    const inputFileRef =
        useRef<HTMLInputElement>(null);

    const [images, setImages] =
        useState<PutBlobResult[]>(
            produk.images.map((img) => ({
                url: img.imageUrl,
            })) as PutBlobResult[]
        );

    const updateProdukWithId =
        updateProduk2.bind(
            null,
            produk.id
        );

    const [state, formAction, isPending] =
        useActionState(
            updateProduk2.bind(
                null,
                produk.id,
                images.map(
                    (item) => item.url
                )
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

        const files = Array.from(
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
                            method: "PUT",
                            body: formData,
                        }
                    );

                if (response.ok) {
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
                `/api/upload?url=${encodeURIComponent(url)}`,
                {
                    method: "DELETE",
                }
            );

            setImages((prev) =>
                prev.filter(
                    (item) =>
                        item.url !== url
                )
            );

        });

    };

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

            <input
                ref={inputFileRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleUpload}
            />

            <div className="grid grid-cols-4 gap-4">

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
                                deleteImage(image.url)
                            }
                            className="absolute top-1 right-1 bg-red-500 text-white px-2 rounded"
                        >
                            X
                        </button>

                    </div>

                ))}

            </div>

            <button
                type="submit"
                disabled={isPending}
            >
                Update
            </button>
        </form>
    );
}