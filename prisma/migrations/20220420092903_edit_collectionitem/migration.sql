-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CollectionItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tokenId" TEXT,
    "title" TEXT,
    "pics" TEXT,
    "price" TEXT,
    "description" TEXT,
    "collectionId" INTEGER,
    "isListed" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_CollectionItem" ("collectionId", "description", "id", "isListed", "pics", "price", "title", "tokenId") SELECT "collectionId", "description", "id", "isListed", "pics", "price", "title", "tokenId" FROM "CollectionItem";
DROP TABLE "CollectionItem";
ALTER TABLE "new_CollectionItem" RENAME TO "CollectionItem";
CREATE UNIQUE INDEX "CollectionItem_tokenId_key" ON "CollectionItem"("tokenId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
