/*
  Warnings:

  - A unique constraint covering the columns `[id_produto,id_clinica]` on the table `Estoque` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Estoque_id_produto_id_clinica_key" ON "Estoque"("id_produto", "id_clinica");
