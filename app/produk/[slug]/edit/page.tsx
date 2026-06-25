import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FormEditProduk from "@/components/produk/form-edit";

export default async function EditPage({
    params,
}: {
    params: Promise<{
        slug: string;
    }>;
}) {
    const { slug } = await params;

    const produk =
        await prisma.produk.findUnique({
            where: {
                slug,
            },
        });

    if (!produk) {
        notFound();
    }

    return (
        <FormEditProduk
            produk={produk}
        />
    );
}