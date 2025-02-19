/*
  Warnings:

  - Added the required column `simbolo` to the `CriptoMoeda` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CriptoMoeda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "simbolo" TEXT NOT NULL,
    "marketCap" TEXT NOT NULL,
    "variacaoVinteQuatroHoras" TEXT NOT NULL,
    "variacaoSetedias" TEXT NOT NULL,
    "valorHistoricoMaisAlto" TEXT NOT NULL,
    "valorHistoricoMaisBaixo" TEXT NOT NULL,
    "valorAtual" TEXT NOT NULL
);
INSERT INTO "new_CriptoMoeda" ("id", "marketCap", "valorAtual", "valorHistoricoMaisAlto", "valorHistoricoMaisBaixo", "variacaoSetedias", "variacaoVinteQuatroHoras") SELECT "id", "marketCap", "valorAtual", "valorHistoricoMaisAlto", "valorHistoricoMaisBaixo", "variacaoSetedias", "variacaoVinteQuatroHoras" FROM "CriptoMoeda";
DROP TABLE "CriptoMoeda";
ALTER TABLE "new_CriptoMoeda" RENAME TO "CriptoMoeda";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
