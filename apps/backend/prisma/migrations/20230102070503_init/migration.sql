-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Url" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "brandName" TEXT NOT NULL,
    "totalPageIndex" INTEGER NOT NULL DEFAULT 1,
    "url" TEXT NOT NULL
);
INSERT INTO "new_Url" ("brandName", "id", "totalPageIndex", "url") SELECT "brandName", "id", "totalPageIndex", "url" FROM "Url";
DROP TABLE "Url";
ALTER TABLE "new_Url" RENAME TO "Url";
CREATE UNIQUE INDEX "Url_brandName_key" ON "Url"("brandName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
