"use server";

import { prisma } from "@/lib/prisma";
import { Produk2Zod } from "./zod";
import slugify from "slugify";
import { redirect } from "next/navigation";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

export const saveProduk2 = async (
    images: string[],
    prevState: unknown,
    formData: FormData
) => {
    const validatedFields =
        Produk2Zod.safeParse(
            Object.fromEntries(formData)
        );

    if (images.length === 0) {
        return {
            message: "Minimal upload 1 gambar",
        };
    }

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
        await prisma.$transaction(async (tx) => {
            const produk = await tx.produk2.create({
                data: {
                    namaProduk,
                    slug,
                    harga,
                    stok,
                    kategoriId,
                },
            });

            await tx.produkImage.createMany({
                data: images.map((url) => ({
                    produkId: produk.id,
                    imageUrl: url,
                })),
            });
        });
    } catch (error) {
        console.log(error);

        return {
            message: "Gagal menyimpan produk",
        };
    }

    revalidatePath("/produk2");
    redirect("/produk2");
};

export const updateProduk2 = async (
    id: string,
    images: string[],
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

    if (images.length === 0) {
        return {
            message: "Minimal upload 1 gambar",
        };
    }

    const {
        namaProduk,
        harga,
        stok,
        kategoriId,
    } = validatedFields.data;

    let slug = slugify(namaProduk, {
        lower: true,
        strict: true,
        trim: true,
    });

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

        await prisma.$transaction(async (tx) => {

            await tx.produk2.update({
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

            // hapus semua relasi gambar
            await tx.produkImage.deleteMany({
                where: {
                    produkId: id,
                },
            });

            // simpan gambar baru
            await tx.produkImage.createMany({
                data: images.map((url) => ({
                    produkId: id,
                    imageUrl: url,
                })),
            });

        });

    } catch (error) {

        console.log(error);

        return {
            message: "Gagal update produk",
        };

    }

    revalidatePath("/produk2");

    redirect("/produk2");
};

export const deleteProduk2 = async (id: string) => {
    try {
        const produk = await prisma.produk2.findUnique({
            where: {
                id,
            },
            include: {
                images: true,
            },
        });

        if (!produk) {
            return {
                message: "Produk tidak ditemukan",
            };
        }

        // Hapus semua gambar di Vercel Blob
        if (produk.images.length > 0) {
            await Promise.all(
                produk.images.map((img) =>
                    del(img.imageUrl)
                )
            );
        }

        // Hapus produk
        await prisma.produk2.delete({
            where: {
                id,
            },
        });
    } catch (error) {
        console.log(error);

        return {
            message: "Gagal menghapus produk",
        };
    }

    redirect("/produk2");
};