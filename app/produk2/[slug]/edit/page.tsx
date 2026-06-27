import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getKategori } from "@/lib/kategori-produk-2/data";
import FormEditProduk2 from "@/components/produk2/form-edit";

export default async function EditPage2({
    params,
}: {
    params: Promise<{
        slug: string;
    }>;
}) {
    const { slug } = await params;

    const produk2 =
        await prisma.produk2.findUnique({
            where: {
                slug,
            },
            include: {
                images: true,
            },
        });

    if (!produk2) {
        notFound();
    }

    const kategori = await getKategori();

    return (
        <FormEditProduk2
            produk={produk2}
            kategori={kategori}
        />
    );
}