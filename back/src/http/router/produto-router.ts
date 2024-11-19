
import { FastifyReply, FastifyRequest } from "fastify";
import { ProdutoInMemory } from "../../repositories/in-memory/memory-produto";
import { ProductController } from "../controller/productController";
import authMiddleware from "../middleware/auth-middleware";
import { app } from "../../app";
import { ProdutoPrismaRepository } from "../../repositories/prisma/produto-prisma";


const controller = new ProductController(new ProdutoPrismaRepository);

export async function productRouter() {
    app.post('/product', (req: FastifyRequest, reply: FastifyReply) => controller.create(req, reply));
    app.post('/product/uso', (req: FastifyRequest, reply: FastifyReply) => controller.newProdutoUso(req, reply));
    app.get('/products', (req: FastifyRequest, reply: FastifyReply) => controller.findAll(req, reply));
    app.get('/product', (req: FastifyRequest, reply: FastifyReply) => controller.findById(req, reply));
    app.put('/product', (req: FastifyRequest, reply: FastifyReply) => controller.update(req, reply));
    app.get('/product/buscar', (req: FastifyRequest, reply: FastifyReply) => controller.buscar(req, reply));
    app.get('/products/uso', (req: FastifyRequest, reply: FastifyReply) => controller.produtoUsoList(req, reply));
    app.put('/product/uso/saida', (req: FastifyRequest, reply: FastifyReply) => controller.removerProdutoUso(req, reply));


}


