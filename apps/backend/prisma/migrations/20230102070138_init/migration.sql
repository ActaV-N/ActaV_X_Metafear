/*
  Warnings:

  - A unique constraint covering the columns `[brandName]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Url_brandName_key" ON "Url"("brandName");
