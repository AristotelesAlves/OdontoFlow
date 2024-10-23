import { productInterface } from "../domain/interface/productInterface";
import { categoriaRepositoryInterface } from "../domain/repository/categoriaRepositoryInterface";
import { marcaRepositoryInterface } from "../domain/repository/marcaRepositoryInterface";
import { ProductRepositoryInterface } from "../domain/repository/productRepositoryInterface";

export class ProductService {
    constructor(
        private productRepository: ProductRepositoryInterface
    ) {}

    async create(data: Omit<productInterface, 'id' | 'dt_deletado' | 'dt_criacao' | 'dt_atualizado' | 'status' | 'em_uso'> 
        & { nome_categoria?: string, nome_marca?: string }): Promise<{ statusCode: number; message?: string; data?: productInterface }> {

        const newProduct = await this.productRepository.save(data);

        if (newProduct) {
            return {
                statusCode: 201,
                message: 'Product created successfully',
                data: newProduct,
            };
        }

        return {
            statusCode: 400,
            message: 'Error creating product'
        };
    }
}
