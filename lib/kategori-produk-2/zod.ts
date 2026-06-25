import { coerce, object, string } from "zod";

export const Produk2Zod = object({
    namaProduk: string().min(3),
    harga: coerce.number().min(0),
    stok: coerce.number().min(0),
    kategoriId: string().min(1),
});