"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovePrisma = void 0;
const prisma_1 = require("../../config/prisma");
class MovePrisma {
    async create(data) {
        // Iniciar a criação da movimentação
        const newMove = await prisma_1.prisma.movimentacao.create({
            data: {
                destino: data.destino,
                tipo: data.tipo,
                estorno: false, // Marca como não estornado inicialmente
                dt_movimentacao: new Date(),
                id_clinica: data.id_clinica,
                id_usuario: data.id_usuario,
                movimentacoesProduto: {
                    create: data.produto_movimentaao.map(produto => ({
                        id_produto: produto.id,
                        quantidade: produto.quantidade,
                        estorno: false, // Define se o produto está estornado ou não
                    })),
                },
            },
            include: {
                movimentacoesProduto: true, // Incluir os produtos movimentados na resposta
            },
        });
        if (!newMove) {
            return null;
        }
        // Lógica para alterar o estoque com base no tipo de movimentação
        if (data.tipo === 'entrada') {
            // Aumenta o estoque para cada produto movimentado
            await Promise.all(data.produto_movimentaao.map(async (produto) => {
                const estoque = await prisma_1.prisma.estoque.findUnique({
                    where: {
                        id_produto_id_clinica: {
                            id_produto: produto.id,
                            id_clinica: data.id_clinica,
                        }
                    }
                });
                if (!estoque) {
                    // Se não houver estoque para o produto, cria um novo
                    await prisma_1.prisma.estoque.create({
                        data: {
                            id_produto: produto.id,
                            id_clinica: data.id_clinica,
                            estoque: produto.quantidade,
                            quantidade_minima: 0, // Ajuste conforme necessário
                        },
                    });
                }
                else {
                    // Se o estoque existir, apenas adiciona a quantidade
                    await prisma_1.prisma.estoque.update({
                        where: {
                            id_produto_id_clinica: {
                                id_produto: produto.id,
                                id_clinica: data.id_clinica,
                            }
                        },
                        data: {
                            estoque: estoque.estoque + produto.quantidade,
                        },
                    });
                }
            }));
        }
        else if (data.tipo === 'saida') {
            // Diminui o estoque para cada produto movimentado
            await Promise.all(data.produto_movimentaao.map(async (produto) => {
                const estoque = await prisma_1.prisma.estoque.findUnique({
                    where: {
                        id_produto_id_clinica: {
                            id_produto: produto.id,
                            id_clinica: data.id_clinica,
                        }
                    }
                });
                if (!estoque || estoque.estoque < produto.quantidade) {
                    // Se não houver estoque suficiente, lança um erro ou retorna um aviso
                    throw new Error(`Estoque insuficiente para o produto ${produto.id}`);
                }
                // Se o estoque for suficiente, subtrai a quantidade
                await prisma_1.prisma.estoque.update({
                    where: {
                        id_produto_id_clinica: {
                            id_produto: produto.id,
                            id_clinica: data.id_clinica,
                        }
                    },
                    data: {
                        estoque: estoque.estoque - produto.quantidade,
                    },
                });
            }));
        }
        else if (data.tipo === 'uso') {
            // Para "uso", se você quiser registrar o uso, pode criar uma entrada na tabela ProdutoUso
            await Promise.all(data.produto_movimentaao.map(async (produto) => {
                await prisma_1.prisma.produtoUso.create({
                    data: {
                        id_produto: produto.id,
                        quantidade: produto.quantidade,
                        id_movimentacao: newMove.id,
                        dt_inicio: new Date(), // Data de início do uso
                    },
                });
            }));
        }
        return {
            id: newMove.id,
            tipo: newMove.tipo,
            id_usuario: newMove.id_usuario,
            id_clinica: newMove.id_clinica,
            destino: newMove.destino,
            estorno: newMove.estorno,
            dt_movimentacao: newMove.dt_movimentacao,
            produto_movimentaao: newMove.movimentacoesProduto.map(produto => ({
                id: produto.id_produto,
                quantidade: produto.quantidade,
            })),
        };
    }
    async getPaginatedMovements(page, pageSize) {
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        const movimentacoes = await prisma_1.prisma.movimentacao.findMany({
            skip,
            take,
            include: {
                movimentacoesProduto: {
                    include: {
                        produto: true
                    },
                },
                usuario: true,
            },
        });
        return movimentacoes.map(mov => ({
            id: mov.id,
            usuario: mov.usuario.nome_usuario,
            destino: mov.destino,
            dt_movimentacao: mov.dt_movimentacao,
            estorno: mov.estorno,
            tipo: mov.tipo
        }));
    }
    async estornar(id) {
        const estorno = await prisma_1.prisma.movimentacao.update({
            where: {
                id: id,
            },
            data: {
                estorno: true,
                movimentacoesProduto: {
                    updateMany: {
                        where: {
                            id_movimentacao: id,
                        },
                        data: {
                            estorno: true,
                        },
                    },
                },
            },
            include: {
                movimentacoesProduto: true
            },
        });
        return estorno ? true : false;
    }
}
exports.MovePrisma = MovePrisma;
