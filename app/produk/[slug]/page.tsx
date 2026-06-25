import { notFound } from "next/navigation";
import { getProdukBySlug } from "@/lib/produk/data";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function DetailProdukPage({
    params,
}: Props) {
    const { slug } = await params;

    const produk =
        await getProdukBySlug(slug);

    if (!produk) {
        notFound();
    }

    return (
        <div>
            <h1>
                {produk.namaProduk}
            </h1>

            <p>
                ID : {produk.id}
            </p>

            <p>
                Nama : {produk.namaProduk}
            </p>

            <p>
                Slug : {produk.slug}
            </p>

            <p>
                Harga : Rp
                {produk.harga.toLocaleString(
                    "id-ID"
                )}
            </p>

            <p>
                Stok : {produk.stok}
            </p>
        </div>
    );
}