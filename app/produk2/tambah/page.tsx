import FormProduk2 from "@/components/produk2/form-tambah";
import { getKategori } from "@/lib/kategori-produk-2/data";

export default async function PageTambahProduk2() {
    const kategori = await getKategori();
    return (
        <>
            <h1>Tambah Produk 2</h1>
            <FormProduk2 kategori={kategori} />
        </>
    );
}