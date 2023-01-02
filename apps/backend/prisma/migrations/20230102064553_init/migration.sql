/*
  Warnings:

  - Added the required column `brandName` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Url" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brandName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "needUpdate" BOOLEAN DEFAULT false
);
INSERT INTO "new_Url" ("id", "needUpdate", "url") SELECT "id", "needUpdate", "url" FROM "Url";
DROP TABLE "Url";
ALTER TABLE "new_Url" RENAME TO "Url";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
