import { getKategori } from "@/lib/kategori-produk-2/data";
import Link from "next/link";

export default async function PageKategori() {

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
        </div>
    );
}