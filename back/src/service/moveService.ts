import { moveInterface } from "../domain/interface/moveInterface";
import { moveRepositoryInterface } from "../domain/repository/moveRepositoryInterface";

export class MoveService {
    constructor(
        private moveRepository: moveRepositoryInterface
    ) {}

    // Método para criar uma movimentação de estoque
    async create(data: Omit<moveInterface, 'id'>): Promise<{ statusCode: number; message?: string; data?: moveInterface }> {
        try {
            const newMove = await this.moveRepository.create(data);

            if (newMove) {
                return {
                    statusCode: 201,
                    message: 'Movimentação criada com sucesso',
                    data: newMove,
                };
            }

            return {
                statusCode: 400,
                message: 'Erro ao criar movimentação',
            };
        } catch (error) {
            return {
                statusCode: 500,
                message: 'Erro interno ao criar movimentação',
            };
        }
    }
    
    async findAll(page: number, pageSize: number): Promise<{ statusCode: number; message?: string; data?: { movimentacoes: moveInterface[]; total: number } }> {
        try {
            const movimentacoes = await this.moveRepository.getPaginatedMovements(page, pageSize);
            
            if (movimentacoes.length === 0) {
                return {
                    statusCode: 404,
                    message: 'Nenhuma movimentação encontrada',
                };
            }

            return {
                statusCode: 200,
                data: {
                    movimentacoes,
                    total: movimentacoes.length, // Pode ser ajustado se você retornar o total real do banco
                },
            };
        } catch (error) {
            return {
                statusCode: 500,
                message: 'Erro interno ao listar movimentações',
            };
        }
    }


    // Método para estornar uma movimentação
    async estornar(id: number): Promise<{ statusCode: number; message: string }> {
        try {
            const estornoSuccess = await this.moveRepository.estornar(id);

            if (estornoSuccess) {
                return {
                    statusCode: 200,
                    message: 'Movimentação estornada com sucesso',
                };
            }

            return {
                statusCode: 404,
                message: 'Movimentação não encontrada para estorno',
            };
        } catch (error) {
            return {
                statusCode: 500,
                message: 'Erro interno ao estornar movimentação',
            };
        }
    }
}
