/*
  Warnings:

  - You are about to drop the column `valorAtual` on the `CriptoMoeda` table. All the data in the column will be lost.
  - You are about to drop the column `valorHistoricoMaisAlto` on the `CriptoMoeda` table. All the data in the column will be lost.
  - You are about to drop the column `valorHistoricoMaisBaixo` on the `CriptoMoeda` table. All the data in the column will be lost.
  - You are about to drop the column `variacaoSetedias` on the `CriptoMoeda` table. All the data in the column will be lost.
  - You are about to drop the column `variacaoVinteQuatroHoras` on the `CriptoMoeda` table. All the data in the column will be lost.
  - You are about to alter the column `marketCap` on the `CriptoMoeda` table. The data in that column could be lost. The data in that column will be cast from `String` to `BigInt`.
  - Added the required column `ath` to the `CriptoMoeda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atl` to the `CriptoMoeda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo` to the `CriptoMoeda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precoAtual` to the `CriptoMoeda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variacao24h` to the `CriptoMoeda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variacao7d` to the `CriptoMoeda` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CriptoMoeda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "simbolo" TEXT NOT NULL,
    "precoAtual" REAL NOT NULL,
    "marketCap" BIGINT NOT NULL,
    "variacao24h" REAL NOT NULL,
    "variacao7d" REAL NOT NULL,
    "ath" REAL NOT NULL,
    "atl" REAL NOT NULL
);
INSERT INTO "new_CriptoMoeda" ("id", "marketCap", "nome", "simbolo") SELECT "id", "marketCap", "nome", "simbolo" FROM "CriptoMoeda";
DROP TABLE "CriptoMoeda";
ALTER TABLE "new_CriptoMoeda" RENAME TO "CriptoMoeda";
CREATE UNIQUE INDEX "CriptoMoeda_codigo_key" ON "CriptoMoeda"("codigo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
