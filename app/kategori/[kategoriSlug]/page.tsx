import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function KategoriPage({
    params,
}: {
    params: Promise<{
        kategoriSlug: string;
    }>;
}) {
    const { kategoriSlug } =
        await params;

    const kategori =
        await prisma.kategori.findUnique({
            where: {
                slug: kategoriSlug,
            },
            include: {
                produk2: true,
            },
        });

    if (!kategori) {
        return <p>Kategori Tidak Tersedia</p>
    }

    return (
        <>
            <h1>
                {
                    kategori.namaKategori
                }
            </h1>

            {kategori.produk2.map(
                (produk) => (
                    <div
                        key={produk.id}
                    >
                        {produk.namaProduk}
                        <Link href={`/kategori/${kategori.slug}/${produk.slug}`}>
                            Lihat Detail
                        </Link>
                    </div>

                )
            )}
        </>
    );
}