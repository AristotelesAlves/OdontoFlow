
import { FastifyReply, FastifyRequest } from "fastify";
import { CategoriaInMemory } from "../../repositories/in-memory/memory-categoria";
import { MarcaInMemory } from "../../repositories/in-memory/memory-marca";
import { ProdutoInMemory } from "../../repositories/in-memory/memory-produto";
import { ProductController } from "../controller/productController";
import authMiddleware from "../middleware/auth-middleware";
import { app } from "../../app";

const memoryProduct = new ProdutoInMemory();
const memoryBrand = new MarcaInMemory();
const memoryCategory = new CategoriaInMemory();
const controller = new ProductController(memoryProduct,memoryBrand,memoryCategory);

export async function productRouter() {
    app.post('/produto', { preHandler: authMiddleware },(req: FastifyRequest, reply: FastifyReply) => controller.create(req, reply));
}


