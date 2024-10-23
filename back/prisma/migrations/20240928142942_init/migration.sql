-- CreateTable
CREATE TABLE "Clinica" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "dt_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_deletado" DATETIME,
    "dt_atualizado" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_usuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "dt_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_deletado" DATETIME,
    "dt_atualizado" DATETIME NOT NULL,
    "id_clinica" INTEGER NOT NULL,
    CONSTRAINT "Usuario_id_clinica_fkey" FOREIGN KEY ("id_clinica") REFERENCES "Clinica" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Recuperacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "codigo_recuperacao" TEXT NOT NULL,
    "dt_validacao" DATETIME,
    "dt_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Recuperacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PerfilUsuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    CONSTRAINT "PerfilUsuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_validade" DATETIME NOT NULL,
    "unidade_medida" TEXT NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "id_marca" INTEGER NOT NULL,
    "id_usuario_atualizacao" INTEGER NOT NULL,
    "id_usuario_cadastro" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "em_uso" BOOLEAN NOT NULL,
    "dt_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_deletado" DATETIME,
    "dt_atualizado" DATETIME NOT NULL,
    "id_clinica" INTEGER NOT NULL,
    CONSTRAINT "Produto_id_clinica_fkey" FOREIGN KEY ("id_clinica") REFERENCES "Clinica" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Produto_id_marca_fkey" FOREIGN KEY ("id_marca") REFERENCES "Marca" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Produto_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Estoque" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_produto" INTEGER NOT NULL,
    "id_clinica" INTEGER NOT NULL,
    "estoque" INTEGER NOT NULL,
    "quantidade_minima" INTEGER NOT NULL,
    CONSTRAINT "Estoque_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Estoque_id_clinica_fkey" FOREIGN KEY ("id_clinica") REFERENCES "Clinica" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Marca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "mensagem" TEXT NOT NULL,
    "visto" DATETIME,
    CONSTRAINT "Notificacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Movimentacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "id_clinica" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "dt_movimentacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Movimentacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Movimentacao_id_clinica_fkey" FOREIGN KEY ("id_clinica") REFERENCES "Clinica" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MovimentacaoProduto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_movimentacao" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    CONSTRAINT "MovimentacaoProduto_id_movimentacao_fkey" FOREIGN KEY ("id_movimentacao") REFERENCES "Movimentacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovimentacaoProduto_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ListaCompra" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_clinica" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,
    CONSTRAINT "ListaCompra_id_clinica_fkey" FOREIGN KEY ("id_clinica") REFERENCES "Clinica" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ListaCompra_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PerfilUsuario_id_usuario_key" ON "PerfilUsuario"("id_usuario");
