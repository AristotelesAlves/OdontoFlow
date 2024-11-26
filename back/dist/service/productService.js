"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async create(data) {
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
    async findAll(page, limit) {
        const { produtos, total } = await this.productRepository.findAll(page, limit);
        console.log(produtos);
        return {
            statusCode: 200,
            data: { produtos, total },
        };
    }
    async findById(id) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            return { statusCode: 404, message: 'Product not found' };
        }
        return { statusCode: 200, data: product };
    }
    async update(id, data) {
        const updatedProduct = await this.productRepository.update(id, data);
        if (!updatedProduct) {
            return { statusCode: 404, message: 'Product not found' };
        }
        return { statusCode: 200, message: 'Product updated successfully', data: updatedProduct };
    }
    async delete(id) {
        const deleted = await this.productRepository.delete(id);
        if (!deleted) {
            return { statusCode: 404, message: 'Product not found' };
        }
        return { statusCode: 200, message: 'Product deleted successfully' };
    }
}
exports.ProductService = ProductService;
