"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveRouter = moveRouter;
const moveController_1 = require("../controller/moveController"); // Importe o controlador
const move_prisma_1 = require("../../repositories/prisma/move-prisma");
async function moveRouter(app) {
    // Criação do repositório e do controlador
    const moveRepository = new move_prisma_1.MovePrisma(); // Repositório da movimentação
    const controller = new moveController_1.MoveController(moveRepository); // Passa o repositório para o controlador
    // Rota para criar a movimentação
    app.post('/move', async (req, reply) => {
        await controller.create(req, reply); // Chama o método create do controlador
    });
    // Rota para listar as movimentações com paginação
    app.get('/move', async (req, reply) => {
        await controller.findAll(req, reply); // Chama o método findAll do controlador
    });
    // Rota para estornar a movimentação
    app.put('/move/:id/estorno', async (req, reply) => {
        await controller.estornar(req, reply); // Chama o método estornar do controlador
    });
    app.get('/notification', (req, reply) => controller.notificationList(req, reply));
    app.put('/notification', (req, reply) => controller.readNotification(req, reply));
    app.get('/lista-compra', (req, reply) => controller.listCompra(req, reply));
}
