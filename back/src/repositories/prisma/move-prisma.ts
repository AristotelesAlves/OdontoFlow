import { prisma } from "../../config/prisma";
import { moveInterface } from "../../domain/interface/moveInterface";
import { moveRepositoryInterface } from "../../domain/repository/moveRepositoryInterface";


export class MovePrisma implements moveRepositoryInterface {

    async create(data: Omit<moveInterface, 'id'>): Promise<moveInterface | null> {
        const newMove = await prisma.movimentacao.create({
            data: {
                destino: data.destino,
                tipo: data.type,
                estorno: false, // Marca como não estornado inicialmente
                dt_movimentacao: new Date(),
                id_clinica: data.id_clinica,
                id_usuario: data.userId,
                movimentacoesProduto: {
                    create: data.produto_movimentaao.map(produto => ({
                        id_produto: produto.id,
                        quantidade: produto.quantidade,
                        estorno: false, // Define se o produto está estornado ou não
                    })),
                },
            },
            include: {
                movimentacoesProduto: true,  // Incluir os produtos movimentados na resposta
            },
        });

        // Se o tipo for "produto em uso", cria um registro na tabela 'produto_uso'
        if (newMove.tipo === "produto em uso") {
            for (const produto of data.produto_movimentaao) {
                await prisma.produtoUso.create({
                    data: {
                        id_produto: produto.id,
                        quantidade: produto.quantidade,
                        id_movimentacao: newMove.id,
                    },
                });
            }
        }

        // Retorna a movimentação criada
        if (newMove) {
            return newMove;
        }

        return null;
    }

    // Método para obter movimentações com paginação
    async getPaginatedMovements(page: number, pageSize: number): Promise<moveInterface[]> {
        const skip = (page - 1) * pageSize;  // Cálculo do deslocamento para a página
        const take = pageSize;  // Quantidade de registros por página

        const movimentacoes = await prisma.movimentacao.findMany({
            skip,
            take,
            include: {
                movimentacoesProduto: true, // Incluir os produtos movimentados
            },
        });

        return movimentacoes;
    }

    // Função para estornar uma movimentação
    async estornar(id: number): Promise<moveInterface | null> {
        // Atualiza a movimentação, marcando ela como estornada
        const estorno = await prisma.movimentacao.update({
            where: {
                id: id,
            },
            data: {
                estorno: true, // Marca como estornada
                movimentacoesProduto: {
                    updateMany: {
                        where: {
                            id_movimentacao: id,
                        },
                        data: {
                            estorno: true, // Marca os produtos como estornados
                        },
                    },
                },
            },
            include: {
                movimentacoesProduto: true,  // Inclui os produtos estornados na resposta
            },
        });

        return estorno;
    }
}
