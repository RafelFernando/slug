"use server";

import { prisma } from "@/lib/prisma";
import { Produk2Zod } from "./zod";
import slugify from "slugify";
import { redirect } from "next/navigation";

export const saveProduk2 = async (
    prevState: unknown,
    formData: FormData
) => {
    const validatedFields =
        Produk2Zod.safeParse(
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
        kategoriId,
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
        await prisma.produk2.findUnique({
            where: {
                slug,
            },
        });

    if (existingSlug) {
        slug = `${slug}-${Date.now()}`;
    }

    try {
        await prisma.produk2.create({
            data: {
                namaProduk,
                slug,
                harga,
                stok,
                kategoriId,
            },
        });
    } catch (error) {
        console.log(error);

        return {
            message:
                "Gagal menyimpan produk",
        };
    }

    redirect("/produk2");
};

export const updateProduk2 = async (
    id: string,
    prevState: unknown,
    formData: FormData
) => {
    const validatedFields =
        Produk2Zod.safeParse(
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
        kategoriId,
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
            await prisma.produk2.findFirst({
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

        await prisma.produk2.update({
            where: {
                id,
            },
            data: {
                namaProduk,
                slug,
                harga,
                stok,
                kategoriId,
            },
        });
    } catch (error) {
        console.log(error);

        return {
            message:
                "Gagal mengupdate produk",
        };
    }

    redirect("/produk2");
};

export const deleteProduk2 = async (
    id: string
) => {
    try {
        await prisma.produk2.delete({
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

    redirect("/produk2");
};