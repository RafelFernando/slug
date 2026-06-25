"use server";

import { redirect } from "next/navigation";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { ProdukZod } from "./zod";

export const saveProduk = async (
    prevState: unknown,
    formData: FormData
) => {
    const validatedFields =
        ProdukZod.safeParse(
            Object.fromEntries(formData)
        );

    if (!validatedFields.success) {
        return {
            errors:
                validatedFields.error.flatten()
                    .fieldErrors,
        };
    }

    const {
        namaProduk,
        harga,
        stok,
    } = validatedFields.data;

    let slug = slugify(
        namaProduk,
        {
            lower: true,
            strict: true,
            trim: true,
        }
    );

    const existingSlug =
        await prisma.produk.findUnique({
            where: {
                slug,
            },
        });

    if (existingSlug) {
        slug = `${slug}-${Date.now()}`;
    }

    try {
        await prisma.produk.create({
            data: {
                namaProduk,
                slug,
                harga,
                stok,
            },
        });
    } catch (error) {
        console.log(error);

        return {
            message:
                "Gagal menyimpan produk",
        };
    }

    redirect("/produk");
};

export const updateProduk = async (
    id: string,
    prevState: unknown,
    formData: FormData
) => {
    const validatedFields =
        ProdukZod.safeParse(
            Object.fromEntries(formData)
        );

    if (!validatedFields.success) {
        return {
            errors:
                validatedFields.error.flatten()
                    .fieldErrors,
        };
    }

    const {
        namaProduk,
        harga,
        stok,
    } = validatedFields.data;

    let slug = slugify(
        namaProduk,
        {
            lower: true,
            strict: true,
            trim: true,
        }
    );

    try {
        const existingSlug =
            await prisma.produk.findFirst({
                where: {
                    slug,
                    NOT: {
                        id,
                    },
                },
            });

        if (existingSlug) {
            slug = `${slug}-${Date.now()}`;
        }

        await prisma.produk.update({
            where: {
                id,
            },
            data: {
                namaProduk,
                slug,
                harga,
                stok,
            },
        });
    } catch (error) {
        console.log(error);

        return {
            message:
                "Gagal mengupdate produk",
        };
    }

    redirect("/produk");
};

export const deleteProduk = async (
    id: string
) => {
    try {
        await prisma.produk.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.log(error);

        return {
            message:
                "Gagal menghapus produk",
        };
    }

    redirect("/produk");
};