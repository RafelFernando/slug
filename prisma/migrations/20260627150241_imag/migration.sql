-- CreateTable
CREATE TABLE "ProdukImage" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "produkId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProdukImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProdukImage" ADD CONSTRAINT "ProdukImage_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk2"("id") ON DELETE CASCADE ON UPDATE CASCADE;
