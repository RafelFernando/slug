import { prisma } from "@/lib/prisma";

export async function getProduk2() {
    try {
        const produk2 = await prisma.produk2.findMany({
            include: {
                kategori: true,
            },
        });

        return produk2;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getKategori = async () => {
    try {
        const kategori = await prisma.kategori.findMany();
        return kategori;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getProduk2ById = async (
    id: string
) => {
    try {
        return await prisma.produk2.findUnique({
            where: { id },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getProduk2BySlug = async (
    slug: string
) => {
    try {
        const produk2 =
            await prisma.produk2.findUnique({
                where: {
                    slug,
                },
                include: {
                    kategori: true,
                },
            });

        return produk2;
    } catch (error) {
        console.log(error);
        throw error;
    }
};