import { FastifyReply, FastifyRequest } from "fastify";
import { categoriaRepositoryInterface } from "../../domain/repository/categoriaRepositoryInterface";
import { marcaRepositoryInterface } from "../../domain/repository/marcaRepositoryInterface";
import { ProductRepositoryInterface } from "../../domain/repository/productRepositoryInterface";
import { createdProductChema } from "../../domain/schemaZoid/productChemaZoid";
import { ProductService } from "../../service/productService";

export class ProductController {
    private service: ProductService;

    constructor(
        private productRepository: ProductRepositoryInterface,
        private categoryRepository: categoriaRepositoryInterface,
        private brandRepository: marcaRepositoryInterface 
    ) {
        this.service = new ProductService(this.productRepository);
    }

    async create(req: FastifyRequest, reply: FastifyReply) {
        try {
            const data = createdProductChema.parse(req.body);
            const result = await this.service.create(data);
            reply.status(result.statusCode).send({
                message: result.message,
                data: result.data,
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply.status(400).send({ message: 'Invalid data', errors: error.errors });
            }
            reply.status(500).send({ message: 'Internal server error' });
        }
    }

    async findAll(req: FastifyRequest, reply: FastifyReply) {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const result = await this.service.findAll(page, limit);
        reply.status(result.statusCode).send(result.data);
    }

    async findById(req: FastifyRequest, reply: FastifyReply) {
        const id = parseInt(req.params.id as string);
        const result = await this.service.findById(id);

        reply.status(result.statusCode).send({
            message: result.message,
            data: result.data,
        });
    }

    async update(req: FastifyRequest, reply: FastifyReply) {
        const id = parseInt(req.params.id as string);
        const data = req.body; 

        const result = await this.service.update(id, data);
        reply.status(result.statusCode).send({
            message: result.message,
            data: result.data,
        });
    }

    async delete(req: FastifyRequest, reply: FastifyReply) {
        const id = parseInt(req.params.id as string);
        const result = await this.service.delete(id);

        reply.status(result.statusCode).send({
            message: result.message,
        });
    }
}
