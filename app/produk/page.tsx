import { getProduk } from "@/lib/produk/data";
import { getKategori } from "@/lib/kategori-produk-2/data";
import DeleteButton from "@/components/produk/delete-button";
import Link from "next/link";

export default async function PageProduk() {
    const produk =
        await getProduk();

    const kategori =
        await getKategori();

    return (
        <div>
            <h1>Halaman Produk</h1>

            <Link href={"/produk/tambah"}>
                Tambah Produk
            </Link>

            <table>
                <thead>
                    <tr>
                        <td>No</td>
                        <td>Nama Kategori</td>
                        <td>Slug</td>
                        <td>Aksi</td>
                    </tr>
                </thead>

                <tbody>
                    {kategori.map((kategori, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{kategori.namaKategori}</td>
                            <td>{kategori.slug}</td>
                            <td>
                                <Link href={`/kategori/${kategori.slug}`}>
                                    Detail
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table>
                <thead>
                    <tr>
                        <td>No</td>
                        <td>Nama Produk</td>
                        <td>Harga</td>
                        <td>Stok</td>
                        <td>Slug</td>
                        <td>Detail</td>
                    </tr>
                </thead>

                <tbody>
                    {produk.map((produk, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{produk.namaProduk}</td>
                            <td>{produk.harga}</td>
                            <td>{produk.stok}</td>
                            <td>{produk.slug}</td>
                            <td>
                                <Link href={`/produk/${produk.slug}`}>
                                    Detail
                                </Link>
                                <Link
                                    href={`/produk/${produk.slug}/edit`}
                                >
                                    Edit
                                </Link>
                                <DeleteButton id={produk.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}