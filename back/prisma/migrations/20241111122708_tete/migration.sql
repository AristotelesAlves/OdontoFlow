-- CreateTable
CREATE TABLE "Clinica" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_deletado" TIMESTAMP(3),
    "dt_atualizado" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clinica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome_usuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_deletado" TIMESTAMP(3),
    "dt_atualizado" TIMESTAMP(3) NOT NULL,
    "id_clinica" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recuperacao" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "codigo_recuperacao" TEXT NOT NULL,
    "dt_validacao" TIMESTAMP(3),
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recuperacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerfilUsuario" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "criar_usuario" BOOLEAN NOT NULL,
    "editar_usuario" BOOLEAN NOT NULL,
    "inativar_usuario" BOOLEAN NOT NULL,
    "adicionar_produto" BOOLEAN NOT NULL,
    "inativar_produto" BOOLEAN NOT NULL,
    "saida_produto" BOOLEAN NOT NULL,
    "entrada_produto" BOOLEAN NOT NULL,
    "uso_produto" BOOLEAN NOT NULL,
    "lista_usuario" BOOLEAN NOT NULL,

    CONSTRAINT "PerfilUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_validade" TIMESTAMP(3) NOT NULL,
    "unidade_medida" TEXT NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "id_marca" INTEGER NOT NULL,
    "id_usuario_atualizacao" INTEGER NOT NULL,
    "id_usuario_cadastro" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "em_uso" BOOLEAN NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_deletado" TIMESTAMP(3),
    "dt_atualizado" TIMESTAMP(3) NOT NULL,
    "id_clinica" INTEGER NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estoque" (
    "id" SERIAL NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "id_clinica" INTEGER NOT NULL,
    "estoque" INTEGER NOT NULL,
    "quantidade_minima" INTEGER NOT NULL,

    CONSTRAINT "Estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Marca" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Marca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "mensagem" TEXT NOT NULL,
    "visto" TIMESTAMP(3),

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimentacao" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_clinica" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "dt_movimentacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movimentacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovimentacaoProduto" (
    "id" SERIAL NOT NULL,
    "id_movimentacao" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "MovimentacaoProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListaCompra" (
    "id" SERIAL NOT NULL,
    "id_clinica" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,

    CONSTRAINT "ListaCompra_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PerfilUsuario_id_usuario_key" ON "PerfilUsuario"("id_usuario");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_id_clinica_fkey" FOREIGN KEY ("id_clinica") REFERENCES "Clinica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recuperacao" ADD CONSTRAINT "Recuperacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerfilUsuario" ADD CONSTRAINT "PerfilUsuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_id_clinica_fkey" FOREIGN KEY ("id_clinica") REFERENCES "Clinica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_id_marca_fkey" FOREIGN KEY ("id_marca") REFERENCES "Marca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_id_clinica_fkey" FOREIGN KEY ("id_clinica") REFERENCES "Clinica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentacao" ADD CONSTRAINT "Movimentacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movimentacao" ADD CONSTRAINT "Movimentacao_id_clinica_fkey" FOREIGN KEY ("id_clinica") REFERENCES "Clinica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentacaoProduto" ADD CONSTRAINT "MovimentacaoProduto_id_movimentacao_fkey" FOREIGN KEY ("id_movimentacao") REFERENCES "Movimentacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovimentacaoProduto" ADD CONSTRAINT "MovimentacaoProduto_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaCompra" ADD CONSTRAINT "ListaCompra_id_clinica_fkey" FOREIGN KEY ("id_clinica") REFERENCES "Clinica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListaCompra" ADD CONSTRAINT "ListaCompra_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
