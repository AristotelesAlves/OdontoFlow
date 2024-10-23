import { FastifyReply, FastifyRequest } from "fastify";
import { categoriaRepositoryInterface } from "../../domain/repository/categoriaRepositoryInterface";
import { marcaRepositoryInterface } from "../../domain/repository/marcaRepositoryInterface";
import { ProductRepositoryInterface } from "../../domain/repository/productRepositoryInterface";
import { createdProductChema } from "../../domain/schemaZoid/productChemaZoid";
import { ProductService } from "../../service/productService";

export class ProductController{

    constructor(
        private productRepository: ProductRepositoryInterface,
        private categoryRepository: categoriaRepositoryInterface,
        private brandRepository: marcaRepositoryInterface 
    ) {}

    private service = new ProductService(this.productRepository, this.categoryRepository, this.brandRepository)

    async create(req: FastifyRequest, reply: FastifyReply){
        const data = createdProductChema.parse(req.body);
        const result = this.service.create(data)
        return 'oi'
    }
}