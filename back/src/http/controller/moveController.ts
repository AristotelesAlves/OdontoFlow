import { FastifyReply, FastifyRequest } from "fastify";
import { MoveService } from "../../service/moveService";

import { ZodError } from "zod";
import { moveRepositoryInterface } from "../../domain/repository/moveRepositoryInterface";
import { createMoveSchema, findAllMoveSchema } from "../../domain/schemaZoid/moveChemaZoid";

export class MoveController {

    private service: MoveService;

    constructor (
        private moveRepository: moveRepositoryInterface
    ) {
        this.service = new MoveService(this.moveRepository);
    }

    async create(req: FastifyRequest, reply: FastifyReply) {
        try {
            // Validar a requisição usando o Zod
            const data = createMoveSchema.parse(req.body);

            // Ajustar o objeto para incluir as propriedades faltantes
            const moveData = {
                ...data,
                estorno: false, // Marca a movimentação como não estornada
                dt_movimentacao: new Date(), // A data da movimentação é a data atual
            };

            const result = await this.service.create(moveData);

            if (result.statusCode === 201) {
                reply.code(201).send(result);
            } else {
                reply.code(result.statusCode).send(result);
            }
        } catch (error) {
            console.error('Error creating movimentacao:', error);
            if (error instanceof ZodError) {
                reply.code(400).send({ message: "Validation error", issues: error.issues });
            } else {
                reply.code(500).send({ message: "Internal server error" });
            }
        }
    }

    async findAll(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { page, limit } = findAllMoveSchema.parse(req.query); // Validando a query de paginação

            const result = await this.service.findAll(Number(page), Number(limit)); // Chama o serviço para buscar as movimentações

            if (result.statusCode === 200) {
                reply.code(200).send(result.data); // Envia as movimentações paginadas com código 200
            } else {
                reply.code(result.statusCode).send(result); // Caso contrário, envia o código de status retornado
            }
            
        } catch (error) {
            console.error('Error fetching movimentacoes:', error);
            if (error instanceof ZodError) {
                // Em caso de erro de validação
                reply.code(400).send({ message: "Validation error", issues: error.issues });
            } else {
                // Em caso de erro interno
                reply.code(500).send({ message: "Internal server error" });
            }
        }
    }

    async estornar(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: number }; // Obtendo o ID da movimentação a ser estornada

            const result = await this.service.estornar(id); // Chama o serviço para estornar a movimentação

            if (result.statusCode === 200) {
                reply.code(200).send(result); // Envia a resposta de sucesso
            } else {
                reply.code(result.statusCode).send(result); // Caso não encontrado, envia o código de erro
            }

        } catch (error) {
            console.error('Error estornando movimentacao:', error);
            if (error instanceof ZodError) {
                reply.code(400).send({ message: "Validation error", issues: error.issues });
            } else {
                reply.code(500).send({ message: "Internal server error" });
            }
        }
    }
}
