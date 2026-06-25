import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10">
      <Link href="/kategori" className="underline text-blue-500 mr-5">Kategori</Link>
      <Link href="/produk" className="underline text-blue-500 mr-5">Produk 1</Link>
      <Link href="/produk2" className="underline text-blue-500 mr-5">Produk 2 (Include Kategori)</Link>
    </div>
  );
}
