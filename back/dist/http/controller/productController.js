"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const productService_1 = require("../../service/productService");
const productChemaZoid_1 = require("../../domain/schemaZoid/productChemaZoid");
const zod_1 = require("zod");
const prisma_1 = require("../../config/prisma");
class ProductController {
    constructor(memory) {
        this.memory = memory;
        this.service = new productService_1.ProductService(this.memory);
    }
    async create(req, reply) {
        try {
            const data = productChemaZoid_1.createdProductChema.parse(req.body);
            const result = await this.service.create({ ...data, data_validade: new Date(data.data_validade) });
            if (result.statusCode === 201) {
                reply.code(201).send(result);
            }
            else {
                reply.code(result.statusCode).send(result);
            }
        }
        catch (error) {
            console.error('Error creating product:', error);
            if (error instanceof zod_1.ZodError) {
                reply.code(400).send({ message: "Validation error", issues: error.issues });
            }
            else {
                reply.code(500).send({ message: "Internal server error" });
            }
        }
    }
    async findAll(req, reply) {
        try {
            const { page, limit } = productChemaZoid_1.findAllProduct.parse(req.query);
            const result = await this.service.findAll(Number(page), Number(limit));
            console.log(result.data.produtos);
            if (result.statusCode === 200) {
                reply.code(200).send(result.data);
            }
            else {
                reply.code(result.statusCode).send(result);
            }
        }
        catch (error) {
            console.error('Error creating product:', error);
            if (error instanceof zod_1.ZodError) {
                reply.code(400).send({ message: "Validation error", issues: error.issues });
            }
            else {
                reply.code(500).send({ message: "Internal server error" });
            }
        }
    }
    async update(req, reply) {
        const data = req.body;
        const { id } = req.query;
        const service = await prisma_1.prisma.produto.update({
            where: { id: Number(id) },
            data: {
                nome: data.nome,
                descricao: data.descricao,
                dt_atualizado: new Date(),
                dt_validade: new Date(data.data_validade),
                fornecedor: data.fornecedor,
                preco: data.preco,
                estoques: {
                    update: {
                        where: {
                            id: data.id_estoque
                        },
                        data: {
                            estoque: data.qt_estoque,
                            quantidade_minima: data.qt_minima
                        }
                    }
                },
                categoria: {
                    update: {
                        where: {
                            id: data.id_categoria
                        },
                        data: {
                            nome: data.nome_categoria
                        }
                    }
                },
                marca: {
                    update: {
                        where: {
                            id: data.id_marca
                        },
                        data: {
                            nome: data.nome_marca
                        }
                    }
                }
            },
            include: {
                categoria: true,
                estoques: true,
                marca: true
            }
        });
        console.log(service);
        if (service) {
            return true;
        }
        return false;
    }
    async findById(req, reply) {
        const { id } = req.query;
        const result = await prisma_1.prisma.produto.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                categoria: true,
                estoques: true,
                marca: true,
            }
        });
        return result;
    }
    async buscar(req, reply) {
        const produtos = await prisma_1.prisma.produto.findMany({
            select: {
                id: true,
                nome: true
            }
        });
        if (produtos) {
            return produtos;
        }
        return false;
    }
    async produtoUsoList(req, reply) {
        const { limit, page } = req.query;
        const listPtUse = await prisma_1.prisma.produtoUso.findMany({
            skip: (page - 1) * limit,
            take: Number(limit),
            include: {
                produto: true
            }
        });
        return listPtUse;
    }
    async newProdutoUso(req, reply) {
        const data = req.body;
        const newMove = await prisma_1.prisma.movimentacao.create({
            data: {
                destino: 'Em uso',
                tipo: 'uso',
                estorno: false,
                id_clinica: 1,
                id_usuario: 1,
                movimentacoesProduto: {
                    create: {
                        id_produto: Number(data.id_produto),
                        quantidade: Number(data.quantidade),
                        estorno: false
                    }
                }
            }
        });
        const uso = await prisma_1.prisma.produtoUso.create({
            data: {
                quantidade: Number(data.quantidade),
                id_produto: Number(data.id_produto),
                id_movimentacao: newMove.id,
            }
        });
        if (uso && newMove) {
            return true;
        }
        return false;
    }
    async removerProdutoUso(req, reply) {
        const { id } = req.query;
        try {
            // Atualiza o produto em uso, marcando a data de término
            const produto = await prisma_1.prisma.produtoUso.update({
                where: { id: Number(id) },
                data: { dt_fim: new Date() },
            });
            if (!produto) {
                return reply.status(404).send({ error: "Produto em uso não encontrado." });
            }
            // Busca o estoque relacionado ao produto
            const estoque = await prisma_1.prisma.estoque.findFirst({
                where: { id_produto: produto.id_produto },
            });
            if (!estoque) {
                return reply.status(404).send({ error: "Estoque não encontrado para o produto." });
            }
            // Atualiza o estoque, subtraindo a quantidade utilizada
            const novoEstoque = estoque.estoque - produto.quantidade;
            await prisma_1.prisma.estoque.update({
                where: { id: estoque.id },
                data: { estoque: novoEstoque },
            });
            // Retorna uma resposta de sucesso
            return reply.status(200).send({ message: "Produto em uso removido e estoque atualizado com sucesso." });
        }
        catch (error) {
            console.error("Erro ao remover produto em uso:", error);
            return reply.status(500).send({ error: "Erro interno ao remover produto em uso." });
        }
    }
    async home(req, reply) {
        const hoje = new Date();
        const inicioDoDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
        const fimDoDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 1);
        const entradas = await prisma_1.prisma.movimentacao.count({
            where: {
                tipo: { in: ['entrada', 'saida'] }, // Verifica se o tipo é 'entrada' ou 'saida'
                dt_movimentacao: {
                    gte: inicioDoDia, // Data maior ou igual ao início do dia
                    lt: fimDoDia, // Data menor que o início do próximo dia
                },
            },
        });
        const produtosUso = await prisma_1.prisma.produtoUso.findMany({
            where: {
                dt_fim: null
            }
        });
        let quantidadeProdutoUso = 0;
        produtosUso.map((item) => {
            quantidadeProdutoUso += item.quantidade;
        });
        reply.send({
            entradas: entradas,
            produto_uso: quantidadeProdutoUso
        });
    }
}
exports.ProductController = ProductController;
