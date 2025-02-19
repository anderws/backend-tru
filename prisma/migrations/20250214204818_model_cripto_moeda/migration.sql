-- CreateTable
CREATE TABLE "CriptoMoeda" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "marketCap" TEXT NOT NULL,
    "variacaoVinteQuatroHoras" TEXT NOT NULL,
    "variacaoSetedias" TEXT NOT NULL,
    "valorHistoricoMaisAlto" TEXT NOT NULL,
    "valorHistoricoMaisBaixo" TEXT NOT NULL,
    "valorAtual" TEXT NOT NULL
);
