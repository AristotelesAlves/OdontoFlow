import { FastifyInstance } from 'fastify';
import { MoveController } from '../controller/moveController'; // Importe o controlador
import { moveRepositoryInterface } from '../../domain/repository/moveRepositoryInterface'; // Interface do repositório
import { MovePrisma } from '../../repositories/prisma/move-prisma';

export async function moveRouter(app: FastifyInstance) {
    // Criação do repositório e do controlador
    const moveRepository: moveRepositoryInterface = new MovePrisma();  // Repositório da movimentação
    const controller = new MoveController(moveRepository);  // Passa o repositório para o controlador

    // Rota para criar a movimentação
    app.post('/move', async (req, reply) => {
        await controller.create(req, reply);  // Chama o método create do controlador
    });

    // Rota para listar as movimentações com paginação
    app.get('/move', async (req, reply) => {
        await controller.findAll(req, reply);  // Chama o método findAll do controlador
    });

    // Rota para estornar a movimentação
    app.put('/move/:id/estorno', async (req, reply) => {
        await controller.estornar(req, reply);  // Chama o método estornar do controlador
    });

    app.get('/notification', (req, reply) => controller.notificationList(req, reply));

    app.put('/notification', (req, reply) => controller.readNotification(req, reply));

    app.get('/lista-compra', (req, reply) => controller.listCompra(req, reply));

}
