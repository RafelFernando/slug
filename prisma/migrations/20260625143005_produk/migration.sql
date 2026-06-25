-- CreateTable
CREATE TABLE "Produk" (
    "id" TEXT NOT NULL,
    "namaProduk" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "stok" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Produk_slug_key" ON "Produk"("slug");
