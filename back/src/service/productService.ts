import { productInterface } from "../domain/interface/productInterface";
import { categoriaRepositoryInterface } from "../domain/repository/categoriaRepositoryInterface";
import { marcaRepositoryInterface } from "../domain/repository/marcaRepositoryInterface";
import { ProductRepositoryInterface } from "../domain/repository/productRepositoryInterface";

export class ProductService {
    constructor(
        private productRepository: ProductRepositoryInterface,
        private categoryRepository: categoriaRepositoryInterface,
        private brandRepository: marcaRepositoryInterface 
    ) {}

    async create(data: Omit<productInterface, 'id' | 'dt_deletado' | 'dt_criacao' | 'dt_atualizado' | 'status' | 'em_uso'> 
        & { nome_categoria?: string, nome_marca?: string }): Promise<{ statusCode: number; message?: string; data?: productInterface }> {

        if (data.id_categoria) {
            const categoryExists = await this.categoryRepository.findById(data.id_categoria);
            if (!categoryExists && data.nome_categoria ) {
                const newCategory = await this.categoryRepository.save({ nome: data.nome_categoria });
                if (newCategory) {
                    data.id_categoria = newCategory.id;
                }
            }
        }

        if (data.id_marca) {
            const brandExists = await this.brandRepository.findById(data.id_marca);
            if (!brandExists && data.nome_marca) {
                const newBrand = await this.brandRepository.save({ nome: data.nome_marca });
                if (newBrand) {
                    data.id_marca = newBrand.id;
                }
            }
        }

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
