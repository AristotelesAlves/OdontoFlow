import { FastifyReply, FastifyRequest } from "fastify";
import { ProductRepositoryInterface } from "../../domain/repository/productRepositoryInterface";
import { ProductService } from "../../service/productService";
import { createdProductChema, findAllProduct } from "../../domain/schemaZoid/productChemaZoid";
import { ZodError } from "zod";
import { prisma } from "../../config/prisma";

export class ProductController {

    private service

    constructor (
        private memory:ProductRepositoryInterface
    ) {
        this.service = new ProductService(this.memory)
    }

    async create(req: FastifyRequest, reply: FastifyReply){
        try {
            const data = createdProductChema.parse(req.body)
            const result = await this.service.create({...data, data_validade: new Date(data.data_validade)})

            if (result.statusCode === 201) {
                reply.code(201).send(result);
            } else {
                reply.code(result.statusCode).send(result);
            }
            
        } catch (error) {
            console.error('Error creating product:', error);
            if (error instanceof ZodError) {
                reply.code(400).send({ message: "Validation error", issues: error.issues });
            } else {
                reply.code(500).send({ message: "Internal server error" });
            }
        }
    }

    async findAll(req: FastifyRequest, reply: FastifyReply){
        try {
            const { page, limit } = findAllProduct.parse(req.query);
            const result = await this.service.findAll(Number(page), Number(limit));
            console.log(result.data.produtos)
            if (result.statusCode === 200) {
                reply.code(200).send(result.data);
            } else {
                reply.code(result.statusCode).send(result);
            }
            
        } catch (error) {
            console.error('Error creating product:', error);
            if (error instanceof ZodError) {
                reply.code(400).send({ message: "Validation error", issues: error.issues });
            } else {
                reply.code(500).send({ message: "Internal server error" });
            }
        }
    }

    async update(req: FastifyRequest, reply: FastifyReply) {
        const data = req.body as {
            nome: string,
            preco: number,
            qt_compra: number,
            descricao: string,
            data_validade: Date,
            fornecedor: string,
            qt_estoque: number,
            id_marca: number,
            id_estoque: number
            id_categoria: number,
            qt_minima: number,
            unidade_medida: string,
            nome_categoria:string,
            nome_marca: string,
            id_usuario_atualizacao: number,
            id_usuario_cadastro:number,
            id_clinica: number,
        }
        const {id} = req.query as {id: number}
    
        const service = await prisma.produto.update({
            where: { id: Number(id) },
            data: {
                nome: data.nome,
                descricao: data.descricao,
                dt_atualizado: new Date(),
                dt_validade: new Date(data.data_validade),
                fornecedor: data.fornecedor,
                preco: data.preco,
                estoques:{
                    update: {
                        where:{
                            id: data.id_estoque
                        },
                        data:{
                            estoque: data.qt_estoque,
                            quantidade_minima: data.qt_minima
                        }
                    }
                },
                categoria:{
                    update:{
                        where:{
                            id: data.id_categoria
                        },
                        data:{
                            nome: data.nome_categoria
                        }
                    }
                },
                marca: {
                    update:{
                        where:{
                            id: data.id_marca
                        },
                        data:{
                            nome: data.nome_marca
                        }
                    }
                }

            }, 
            include:{
                categoria:true,
                estoques:true,
                marca:true
            }
        });
        console.log(service)
        if (service) {
            return true;
        }
        return false;
    }
    

    async findById(req: FastifyRequest, reply: FastifyReply){
        const {id} = req.query as {id: number}

        const result = await prisma.produto.findUnique({
            where:{
                id: Number(id)
            },
            include:{
                categoria: true,
                estoques: true,
                marca: true,
            }
        })
        return result
    }

    async buscar(req: FastifyRequest, reply: FastifyReply) {

        const produtos = await prisma.produto.findMany({
            select: {
                id: true,
                nome: true
            }
        });

        if(produtos){
            return produtos
        }
        return false
        
    }

    async produtoUsoList(req: FastifyRequest, reply: FastifyReply){
        const {limit, page} = req.query as {limit:number, page:number}
       const listPtUse = await prisma.produtoUso.findMany({
        skip: (page - 1) * limit,
        take: Number(limit),
        include:{
            produto: true
        }
       })
       return listPtUse
    }

    async newProdutoUso(req: FastifyRequest, reply: FastifyReply){
        const data = req.body as {
            id_produto: number,
            quantidade: number,
        }
        const newMove = await prisma.movimentacao.create({
            data:{
                destino: 'Em uso',
                tipo:'uso',
                estorno: false,
                id_clinica: 1,
                id_usuario: 1,
                movimentacoesProduto:{
                    create:{
                        id_produto: Number(data.id_produto),
                        quantidade: Number(data.quantidade),
                        estorno: false
                    }
                }
            }
        })
        const uso = await prisma.produtoUso.create({
            data:{
                quantidade: Number(data.quantidade),
                id_produto: Number(data.id_produto),
                id_movimentacao: newMove.id,

            }
        })

        if(uso && newMove){
            return true
        }
        return false
    }

    async removerProdutoUso(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.query as { id: number };
    
        try {
            // Atualiza o produto em uso, marcando a data de término
            const produto = await prisma.produtoUso.update({
                where: { id: Number(id) },
                data: { dt_fim: new Date() },
            });
    
            if (!produto) {
                return reply.status(404).send({ error: "Produto em uso não encontrado." });
            }
    
            // Busca o estoque relacionado ao produto
            const estoque = await prisma.estoque.findFirst({
                where: { id_produto: produto.id_produto },
            });
    
            if (!estoque) {
                return reply.status(404).send({ error: "Estoque não encontrado para o produto." });
            }
    
            // Atualiza o estoque, subtraindo a quantidade utilizada
            const novoEstoque = estoque.estoque - produto.quantidade;
    
            await prisma.estoque.update({
                where: { id: estoque.id },
                data: { estoque: novoEstoque },
            });
    
            // Retorna uma resposta de sucesso
            return reply.status(200).send({ message: "Produto em uso removido e estoque atualizado com sucesso." });
        } catch (error) {
            console.error("Erro ao remover produto em uso:", error);
            return reply.status(500).send({ error: "Erro interno ao remover produto em uso." });
        }
    }

    async home(req: FastifyRequest, reply: FastifyReply) {
        const hoje = new Date();
        const inicioDoDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
        const fimDoDia = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 1);
    
        const entradas = await prisma.movimentacao.count({
            where: {
                tipo: { in: ['entrada', 'saida'] }, // Verifica se o tipo é 'entrada' ou 'saida'
                dt_movimentacao: {
                    gte: inicioDoDia, // Data maior ou igual ao início do dia
                    lt: fimDoDia, // Data menor que o início do próximo dia
                },
            },
        });

        const produtosUso = await prisma.produtoUso.findMany({
            where:{
                dt_fim: null
            }
        })

        let quantidadeProdutoUso = 0

        produtosUso.map((item) => {
            quantidadeProdutoUso += item.quantidade
        })
    
        reply.send({
            entradas: entradas,
            produto_uso: quantidadeProdutoUso
        });
    }

}