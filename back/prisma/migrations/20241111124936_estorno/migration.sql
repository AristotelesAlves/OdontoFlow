/*
  Warnings:

  - Added the required column `estorno` to the `MovimentacaoProduto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovimentacaoProduto" ADD COLUMN     "estorno" BOOLEAN NOT NULL;
