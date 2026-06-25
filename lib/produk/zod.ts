import { coerce, object, string } from "zod";

export const ProdukZod = object({
    namaProduk: string(),
    harga: coerce.number(),
    stok: coerce.number(),
});