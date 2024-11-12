/*
  Warnings:

  - Added the required column `estorno` to the `Movimentacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movimentacao" ADD COLUMN     "estorno" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "ProdutoUso" (
    "id" SERIAL NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "id_movimentacao" INTEGER NOT NULL,
    "dt_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_fim" TIMESTAMP(3),

    CONSTRAINT "ProdutoUso_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProdutoUso" ADD CONSTRAINT "ProdutoUso_id_movimentacao_fkey" FOREIGN KEY ("id_movimentacao") REFERENCES "Movimentacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutoUso" ADD CONSTRAINT "ProdutoUso_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
