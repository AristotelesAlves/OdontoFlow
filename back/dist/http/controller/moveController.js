"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveController = void 0;
const moveService_1 = require("../../service/moveService");
const zod_1 = require("zod");
const moveChemaZoid_1 = require("../../domain/schemaZoid/moveChemaZoid");
const prisma_1 = require("../../config/prisma");
class MoveController {
    constructor(moveRepository) {
        this.moveRepository = moveRepository;
        this.service = new moveService_1.MoveService(this.moveRepository);
    }
    async create(req, reply) {
        try {
            const data = req.body;
            if (!data.produto_movimentacao || data.produto_movimentacao.length === 0) {
                return reply.status(400).send({ error: "produto_movimentacao não pode estar vazio" });
            }
            for (const produtoMov of data.produto_movimentacao) {
                const estoque = await prisma_1.prisma.estoque.findUnique({
                    where: {
                        id_produto_id_clinica: {
                            id_produto: produtoMov.id,
                            id_clinica: data.id_clinica,
                        },
                    },
                    include: { produto: true },
                });
                if (!estoque) {
                    return reply.status(404).send({
                        error: `Estoque não encontrado para o produto com ID ${produtoMov.id} na clínica ${data.id_clinica}.`,
                    });
                }
                const estoqueAtual = estoque.estoque;
                const estoqueMinimo = estoque.quantidade_minima;
                let novoEstoque = estoqueAtual;
                if (data.tipo === "entrada") {
                    novoEstoque += produtoMov.quantidade;
                }
                else if (data.tipo === "saida") {
                    if (estoqueAtual < produtoMov.quantidade) {
                        return reply.status(400).send({
                            error: `O produto '${estoque.produto.nome}' possui apenas ${estoqueAtual} unidade(s) em estoque. Movimentação não finalizada.`,
                        });
                    }
                    novoEstoque -= produtoMov.quantidade;
                }
                else {
                    return reply.status(400).send({ error: "Tipo inválido. Deve ser 'entrada' ou 'saida'." });
                }
                await prisma_1.prisma.estoque.update({
                    where: { id: estoque.id },
                    data: { estoque: novoEstoque },
                });
                if (data.tipo === "entrada") {
                    await prisma_1.prisma.produto.update({
                        where: {
                            id: estoque.id_produto
                        },
                        data: {
                            preco: produtoMov.valor
                        }
                    });
                }
                // Notificar usuários da clínica se estoque ficar abaixo do mínimo
                if (novoEstoque < estoqueMinimo) {
                    const usuarios = await prisma_1.prisma.usuario.findMany({
                        where: { id_clinica: data.id_clinica },
                    });
                    const notificacoes = usuarios.map(usuario => ({
                        id_usuario: usuario.id,
                        mensagem: `O produto '${estoque.produto.nome}' está abaixo do estoque mínimo.`,
                    }));
                    await prisma_1.prisma.notificacao.createMany({
                        data: notificacoes,
                    });
                    await prisma_1.prisma.listaCompra.findFirst({
                        where: {
                            id_produto: estoque.id_produto,
                            id_clinica: data.id_clinica,
                        },
                    }).then(async (listaCompraExistente) => {
                        if (!listaCompraExistente) {
                            // Se não existir, cria uma nova entrada
                            await prisma_1.prisma.listaCompra.create({
                                data: {
                                    id_produto: estoque.id_produto,
                                    id_clinica: data.id_clinica,
                                },
                            });
                        }
                    });
                }
                if (novoEstoque > estoqueMinimo) {
                    // Verifica se o produto já está na lista de compras
                    const listaCompraExistente = await prisma_1.prisma.listaCompra.findFirst({
                        where: {
                            id_produto: estoque.id_produto,
                            id_clinica: data.id_clinica,
                        },
                    });
                    // Remove o produto da lista de compras se ele existir
                    if (listaCompraExistente) {
                        await prisma_1.prisma.listaCompra.delete({
                            where: {
                                id: listaCompraExistente.id,
                            },
                        });
                    }
                }
            }
            const registerMov = await prisma_1.prisma.movimentacao.create({
                data: {
                    destino: data.destino,
                    tipo: data.tipo,
                    estorno: false,
                    id_clinica: data.id_clinica,
                    id_usuario: data.id_usuario,
                    movimentacoesProduto: {
                        createMany: {
                            data: data.produto_movimentacao.map(produto => ({
                                id_produto: produto.id,
                                quantidade: produto.quantidade,
                                estorno: false,
                                valor: produto.valor
                            })),
                        },
                    },
                },
            });
            return reply.status(200).send({ message: "Movimentação registrada com sucesso.", registerMov });
        }
        catch (error) {
            console.error("Erro ao criar movimentação:", error);
            return reply.status(500).send({ error: "Erro interno do servidor." });
        }
    }
    async findById(req, reply) {
        const { id } = req.params;
        const service = await prisma_1.prisma.movimentacao.findUnique({
            where: {
                id: id
            },
            include: {
                movimentacoesProduto: true,
                usuario: true,
            }
        });
        if (service) {
            return service;
        }
        else {
            return 'error';
        }
    }
    async findAll(req, reply) {
        try {
            const { page, limit } = moveChemaZoid_1.findAllMoveSchema.parse(req.query); // Validando a query de paginação
            const result = await this.service.findAll(Number(page), Number(limit)); // Chama o serviço para buscar as movimentações
            if (result.statusCode === 200) {
                reply.code(200).send(result.data); // Envia as movimentações paginadas com código 200
            }
            else {
                reply.code(result.statusCode).send(result); // Caso contrário, envia o código de status retornado
            }
        }
        catch (error) {
            console.error('Error fetching movimentacoes:', error);
            if (error instanceof zod_1.ZodError) {
                // Em caso de erro de validação
                reply.code(400).send({ message: "Validation error", issues: error.issues });
            }
            else {
                // Em caso de erro interno
                reply.code(500).send({ message: "Internal server error" });
            }
        }
    }
    async estornar(req, reply) {
        try {
            const { id } = req.params; // Obtendo o ID da movimentação a ser estornada
            const result = await this.service.estornar(Number(id)); // Chama o serviço para estornar a movimentação
            if (result.statusCode === 200) {
                reply.code(200).send(result); // Envia a resposta de sucesso
            }
            else {
                reply.code(result.statusCode).send(result); // Caso não encontrado, envia o código de erro
            }
        }
        catch (error) {
            console.error('Error estornando movimentacao:', error);
            if (error instanceof zod_1.ZodError) {
                reply.code(400).send({ message: "Validation error", issues: error.issues });
            }
            else {
                reply.code(500).send({ message: "Internal server error" });
            }
        }
    }
    async notificationList(req, reply) {
        const { id } = req.query;
        console.log(id);
        const result = await prisma_1.prisma.notificacao.findMany({
            where: {
                id_usuario: Number(id),
                AND: {
                    visto: null
                }
            }
        });
        return result;
    }
    async readNotification(req, reply) {
        const { id } = req.query;
        const result = await prisma_1.prisma.notificacao.update({
            where: {
                id: Number(id)
            },
            data: {
                visto: new Date()
            }
        });
    }
    async listCompra(req, reply) {
        const result = await prisma_1.prisma.listaCompra.findMany({
            include: {
                produto: {
                    include: {
                        estoques: true,
                        marca: true
                    }
                }
            }
        });
        return result;
    }
}
exports.MoveController = MoveController;
