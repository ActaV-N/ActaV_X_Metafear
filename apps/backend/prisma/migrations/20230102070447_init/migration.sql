/*
  Warnings:

  - Added the required column `totalPageIndex` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Url" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brandName" TEXT NOT NULL,
    "totalPageIndex" INTEGER NOT NULL,
    "url" TEXT NOT NULL
);
INSERT INTO "new_Url" ("brandName", "id", "url") SELECT "brandName", "id", "url" FROM "Url";
DROP TABLE "Url";
ALTER TABLE "new_Url" RENAME TO "Url";
CREATE UNIQUE INDEX "Url_brandName_key" ON "Url"("brandName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
