
import { FastifyReply, FastifyRequest } from "fastify";
import { ProdutoInMemory } from "../../repositories/in-memory/memory-produto";
import { ProductController } from "../controller/productController";
import authMiddleware from "../middleware/auth-middleware";
import { app } from "../../app";


const controller = new ProductController(new ProdutoInMemory());

export async function productRouter() {
    app.post('/product', { preHandler: authMiddleware }, (req: FastifyRequest, reply: FastifyReply) => controller.create(req, reply));
    app.get('/products', (req: FastifyRequest, reply: FastifyReply) => controller.findAll(req, reply));
    app.get('/product:id', (req: FastifyRequest, reply: FastifyReply) => controller.findById(req, reply));
}


