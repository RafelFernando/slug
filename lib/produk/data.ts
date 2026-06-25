import { prisma } from "@/lib/prisma";

export async function getProduk() {
    try {
        const produk = await prisma.produk.findMany();
        return produk;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getProdukById = async (
    id: string
) => {
    try {
        return await prisma.produk.findUnique({
            where: { id },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getProdukBySlug = async (
    slug: string
) => {
    try {
        const produk =
            await prisma.produk.findUnique({
                where: {
                    slug,
                },
            });

        return produk;
    } catch (error) {
        console.log(error);
        throw error;
    }
};