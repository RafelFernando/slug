import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function DetailProduk({
    params,
}: {
    params: Promise<{
        kategoriSlug: string;
        produkSlug: string;
    }>;
}) {
    const {
        kategoriSlug,
        produkSlug,
    } = await params;

    const produk =
        await prisma.produk2.findFirst({
            where: {
                slug: produkSlug,
                kategori: {
                    slug:
                        kategoriSlug,
                },
            },
            include: {
                kategori: true,
            },
        });

    if (!produk) {
        notFound();
    }

    return (
        <>
            <h1>
                {
                    produk.namaProduk
                }
            </h1>

            <p>
                Kategori:
                {
                    produk
                        .kategori
                        .namaKategori
                }
            </p>

            <p>
                Harga:
                Rp
                {produk.harga.toLocaleString(
                    "id-ID"
                )}
            </p>

            <p>
                Stok:
                {produk.stok}
            </p>
        </>
    );
}