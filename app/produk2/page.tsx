import { getProduk2 } from "@/lib/kategori-produk-2/data";
import DeleteButtonProduk2 from "@/components/produk2/delete-button";
import Link from "next/link";

export default async function PageProduk2() {
    const produk =
        await getProduk2();


    return (
        <div>
            <h1>Halaman Produk</h1>

            <Link href={"/produk2/tambah"}>
                Tambah Produk
            </Link>

            <table>
                <thead>
                    <tr>
                        <td>No</td>
                        <td>Nama Produk</td>
                        <td>Harga</td>
                        <td>Stok</td>
                        <td>Kategori</td>
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
                            <td>{produk.kategori.namaKategori}</td>
                            <td>{produk.slug}</td>
                            <td>
                                <Link href={`/produk2/${produk.slug}`}>
                                    Detail
                                </Link>
                                <Link
                                    href={`/produk2/${produk.slug}/edit`}
                                >
                                    Edit
                                </Link>
                                <DeleteButtonProduk2 id={produk.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}