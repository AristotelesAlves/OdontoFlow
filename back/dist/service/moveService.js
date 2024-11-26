"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveService = void 0;
class MoveService {
    constructor(moveRepository) {
        this.moveRepository = moveRepository;
    }
    // Método para criar uma movimentação de estoque
    async create(data) {
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
        }
        catch (error) {
            return {
                statusCode: 500,
                message: 'Erro interno ao criar movimentação',
            };
        }
    }
    async findAll(page, pageSize) {
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
                    movimentacoes
                },
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                message: 'Erro interno ao listar movimentações',
            };
        }
    }
    // Método para estornar uma movimentação
    async estornar(id) {
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
        }
        catch (error) {
            return {
                statusCode: 500,
                message: 'Erro interno ao estornar movimentação',
            };
        }
    }
}
exports.MoveService = MoveService;
