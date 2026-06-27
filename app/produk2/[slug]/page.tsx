import { notFound } from "next/navigation";
import { getProduk2BySlug } from "@/lib/kategori-produk-2/data";
import Image from "next/image";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function DetailProduk2Page({
    params,
}: Props) {
    const { slug } = await params;

    const produk2 =
        await getProduk2BySlug(slug);

    if (!produk2) {
        notFound();
    }

    return (
        <div>
            <h1>
                {produk2.namaProduk}
            </h1>

            <p>
                ID : {produk2.id}
            </p>

            <p>
                Nama : {produk2.namaProduk}
            </p>

            <p>
                Slug : {produk2.slug}
            </p>

            <p>
                Harga : Rp
                {produk2.harga.toLocaleString(
                    "id-ID"
                )}
            </p>

            <p>
                Stok : {produk2.stok}
            </p>

            <p>
                Kategori: {produk2.kategori?.namaKategori}
            </p>

            {produk2.images.map((image) => (
                <Image
                    key={image.id}
                    src={image.imageUrl}
                    alt=""
                    width={100}
                    height={100}
                />
            ))}
        </div>
    );
}