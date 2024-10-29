import { productInterface } from "../domain/interface/productInterface";
import { ProductRepositoryInterface } from "../domain/repository/productRepositoryInterface";

export class ProductService {
    constructor(
        private productRepository: ProductRepositoryInterface
    ) {}

    async create(data: Omit<productInterface, 'id' | 'dt_deletado' | 'dt_criacao' | 'dt_atualizado' | 'status' | 'id_usuario_atualizacao'> & {
        nome_categoria: string;
        nome_marca: string;
        qt_estoque: number;
        qt_compra: number;
        qt_minima: number;
    }): Promise<{ statusCode: number; message?: string; data?: productInterface }> {

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

    async findAll(page: number, limit: number): Promise<{ statusCode: number; data?: { produtos: productInterface[]; total: number } }> {
        const { produtos, total } = await this.productRepository.findAll(page, limit);
        return {
            statusCode: 200,
            data: { produtos, total },
        };
    }

    async findById(id: number): Promise<{ statusCode: number; message?: string; data?: productInterface }> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            return { statusCode: 404, message: 'Product not found' };
        }
        return { statusCode: 200, data: product };
    }

    async update(id: number, data: Partial<Omit<productInterface, 'id' | 'dt_deletado' | 'dt_criacao' | 'dt_atualizado'>>): Promise<{ statusCode: number; message?: string; data?: productInterface }> {
        const updatedProduct = await this.productRepository.update(id, data);
        if (!updatedProduct) {
            return { statusCode: 404, message: 'Product not found' };
        }
        return { statusCode: 200, message: 'Product updated successfully', data: updatedProduct };
    }

    async delete(id: number): Promise<{ statusCode: number; message?: string }> {
        const deleted = await this.productRepository.delete(id);
        if (!deleted) {
            return { statusCode: 404, message: 'Product not found' };
        }
        return { statusCode: 200, message: 'Product deleted successfully' };
    }
}
