import { categoriaInterface } from "../../domain/interface/categoriaInterface";
import { productInterface } from "../../domain/interface/productInterface";
import { storeInterface } from "../../domain/interface/storeInterface";
import { ProductRepositoryInterface } from "../../domain/repository/productRepositoryInterface";

export class ProdutoInMemory implements ProductRepositoryInterface {
    private produtos: productInterface[] = [
        {
            id: 1,
            nome: 'Antisséptico Bucal',
            descricao: 'Antisséptico para uso bucal, ideal para reduzir a placa bacteriana.',
            id_categoria: 1,
            id_clinica: 1,
            id_marca: 1,
            id_usuario_atualizacao: null,
            id_usuario_cadastro: 1,
            status: true,
            unidade_medida: 'un',
            dt_validade: new Date('2025-12-31'),
            dt_criacao: new Date(),
            dt_atualizado: null,
            dt_deletado: null,
            preco: 20
        },
        {
            id: 2,
            nome: 'produto para fins de teste',
            descricao: 'Antisséptico para uso bucal, ideal para reduzir a placa bacteriana.',
            id_categoria: 1,
            id_clinica: 1,
            id_marca: 1,
            id_usuario_atualizacao: null,
            id_usuario_cadastro: 1,
            status: true,
            unidade_medida: 'un',
            dt_validade: new Date('2025-12-31'),
            dt_criacao: new Date(),
            dt_atualizado: null,
            dt_deletado: null,
            preco: 20
        },
    ];

    private category: categoriaInterface[] = [
        { id: 1, nome: 'Higiene Bucal' },
        { id: 2, nome: 'Instrumentos Dentários' },
        { id: 3, nome: 'Higiene' }
    ]; 

    private mark: categoriaInterface[] = [
        { id: 1, nome: 'FreshMint' },
        { id: 2, nome: 'CleanTeeth' },
        { id: 3, nome: 'SafeHands' }
    ]; 

    private story: storeInterface[] = [
        {
            id: 1,
            qt_estoque: 2,
            id_clinica: 1,
            id_produto: 1,
            qt_minima: 10,
            qt_compra: 10
        }
    ];

    async save(data: Omit<productInterface, 'id' | 'dt_deletado' | 'dt_criacao' | 'dt_atualizado' | 'status' | 'id_usuario_atualizacao' | 'id_marca' | 'id_categoria'> & {
        nome_categoria: string;
        nome_marca: string;
        qt_estoque: number;
        qt_compra: number,
        qt_minima: number
    }): Promise<productInterface | null> {
        const categoria = this.category.find(cat => cat.nome === data.nome_categoria) || null;
        let id_categoria = categoria?.id;

        if (!categoria) {
            id_categoria = this.category.length + 1;
            this.category.push({
                id: id_categoria,
                nome: data.nome_categoria
            });
        }

        const marca = this.mark.find(m => m.nome === data.nome_marca) || null;
        let id_marca = marca?.id;

        if (!marca) {
            id_marca = this.mark.length + 1;
            this.mark.push({
                id: id_marca,
                nome: data.nome_marca
            });
        }

        const newProduct: productInterface = {
            id: this.produtos.length + 1,
            descricao: data.descricao,
            dt_atualizado: null,
            dt_criacao: new Date(),
            dt_deletado: null,
            preco: data.preco,
            dt_validade: data.dt_validade,
            id_clinica: data.id_clinica,
            id_usuario_atualizacao: null,
            id_usuario_cadastro: data.id_usuario_cadastro,
            nome: data.nome,
            status: true,
            unidade_medida: data.unidade_medida,
            id_categoria: id_categoria,
            id_marca: id_marca
        };

        this.story.push({
            id: this.story.length + 1,
            id_clinica: data.id_clinica,
            id_produto: newProduct.id,
            qt_estoque: data.qt_estoque,
            qt_compra: data.qt_compra,
            qt_minima: data.qt_minima
        });

        this.produtos.push(newProduct);
    
        return newProduct;
    }

    async findAll(page: number, limit: number): Promise<{ produtos: productInterface[], total: number }> {
        const total = this.produtos.length; 
        const startIndex = (page - 1) * limit; 
        const endIndex = startIndex + limit;
    
        const produtos = this.produtos.slice(startIndex, endIndex); 
    
        return { produtos, total };
    }

    async findById(id: number): Promise<productInterface | null> {
        return this.produtos.find(produto => produto.id === id) || null;
    }

    async update(id: number, data: Partial<Omit<productInterface, 'id' | 'dt_deletado' | 'dt_criacao' | 'dt_atualizado'>>): Promise<productInterface | null> {
        const productIndex = this.produtos.findIndex(produto => produto.id === id);
        if (productIndex === -1) return null;

        const updatedProduct = { ...this.produtos[productIndex], ...data, dt_atualizado: new Date() };
        this.produtos[productIndex] = updatedProduct;

        return updatedProduct;
    }

    async delete(id: number): Promise<boolean> {
        const productIndex = this.produtos.findIndex(produto => produto.id === id);
        if (productIndex === -1) return false;

        this.produtos[productIndex].dt_deletado = new Date();
        return true;
    }
}
