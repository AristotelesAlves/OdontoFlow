import { FastifyReply, FastifyRequest } from "fastify";
import { ProductRepositoryInterface } from "../../domain/repository/productRepositoryInterface";
import { ProductService } from "../../service/productService";
import { createdProductChema, findAllProduct } from "../../domain/schemaZoid/productChemaZoid";
import { ZodError } from "zod";

export class ProductController {

    private service

    constructor (
        private memory:ProductRepositoryInterface
    ) {
        this.service = new ProductService(this.memory)
    }

    async create(req: FastifyRequest, reply: FastifyReply){
        try {
            const data = createdProductChema.parse(req.body)
            const result = await this.service.create(data)

            if (result.statusCode === 201) {
                reply.code(201).send(result);
            } else {
                reply.code(result.statusCode).send(result);
            }
            
        } catch (error) {
            console.error('Error creating product:', error);
            if (error instanceof ZodError) {
                reply.code(400).send({ message: "Validation error", issues: error.issues });
            } else {
                reply.code(500).send({ message: "Internal server error" });
            }
        }
    }

    async findAll(req: FastifyRequest, reply: FastifyReply){
        try {
            const { page, limit } = findAllProduct.parse(req.query);
            const result = await this.service.findAll(Number(page), Number(limit));
            if (result.statusCode === 200) {
                reply.code(200).send(result.data);
            } else {
                reply.code(result.statusCode).send(result);
            }
            
        } catch (error) {
            console.error('Error creating product:', error);
            if (error instanceof ZodError) {
                reply.code(400).send({ message: "Validation error", issues: error.issues });
            } else {
                reply.code(500).send({ message: "Internal server error" });
            }
        }
    }


    async findById(req: FastifyRequest, reply: FastifyReply){
        const data = req.params
        console.log(data)
        reply.code(200).send('Olá meu amigo')
    }


}