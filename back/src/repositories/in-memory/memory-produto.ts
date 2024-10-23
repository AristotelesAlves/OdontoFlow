import { categoriaInterface } from "../../domain/interface/categoriaInterface";
import { productInterface } from "../../domain/interface/productInterface";
import { storeInterface } from "../../domain/interface/storeInterface";
import { ProductRepositoryInterface } from "../../domain/repository/productRepositoryInterface";
import { CategoriaInMemory } from "./memory-categoria";

export class ProdutoInMemory implements ProductRepositoryInterface {
    private produtos: productInterface[] = [
        {
            id: 1,
            nome: 'Antisséptico Bucal',
            descricao: 'Antisséptico para uso bucal, ideal para reduzir a placa bacteriana.',
            em_uso: false,
            id_categoria: 1, // Higiene Bucal
            id_clinica: 1,
            id_marca: 1, // FreshMint
            id_usuario_atualizacao: null,
            id_usuario_cadastro: 1,
            status: true,
            unidade_medida: 'un',
            dt_validade: new Date('2025-12-31'),
            dt_criacao: new Date(),
            dt_atualizado: null,
            dt_deletado: null,
        },
        {
            id: 2,
            nome: 'Escova de Dentes',
            descricao: 'Escova de dentes macia, indicada para uso diário.',
            em_uso: false,
            id_categoria: 2, // Instrumentos Dentários
            id_clinica: 1,
            id_marca: 2, // CleanTeeth
            id_usuario_atualizacao: null,
            id_usuario_cadastro: 1,
            status: true,
            unidade_medida: 'un',
            dt_validade: new Date('2024-06-30'),
            dt_criacao: new Date(),
            dt_atualizado: null,
            dt_deletado: null,
        },
        {
            id: 3,
            nome: 'Fio Dental',
            descricao: 'Fio dental para limpeza entre os dentes.',
            em_uso: false,
            id_categoria: 3, // Higiene
            id_clinica: 1,
            id_marca: 3, // SafeHands
            id_usuario_atualizacao: null,
            id_usuario_cadastro: 1,
            status: true,
            unidade_medida: 'un',
            dt_validade: new Date('2024-12-01'),
            dt_criacao: new Date(),
            dt_atualizado: null,
            dt_deletado: null,
        }
    ];

    private category: categoriaInterface[] = [
        { id: 1, nome: 'Higiene Bucal' },
        { id: 2, nome: 'Instrumentos Dentários' },
        { id: 3, nome: 'Higiene' }
    ]; 

    private marca: categoriaInterface[] = [
        { id: 1, nome: 'FreshMint' },
        { id: 2, nome: 'CleanTeeth' },
        { id: 3, nome: 'SafeHands' }
    ]; 

    private story: storeInterface[] = [];

    constructor(private categoriaRepository: CategoriaInMemory) {}

    private findOrCreateCategory(name: string): number {
        let category = this.category.find(cat => cat.nome === name);
        if (!category) {
            category = { id: this.category.length + 1, nome: name };
            this.category.push(category);
        }
        return category.id;
    }

    private findOrCreateBrand(name: string): number {
        let brand = this.marca.find(m => m.nome === name);
        if (!brand) {
            brand = { id: this.marca.length + 1, nome: name };
            this.marca.push(brand);
        }
        return brand.id;
    }

    private addToStory(action: string, productId: number) {
        const newStoryEntry: storeInterface = {
            id: this.story.length + 1,
            action,
            productId,
            timestamp: new Date()
        };
        this.story.push(newStoryEntry);
    }

    async save(data: Omit<productInterface, 'id' | 'dt_deletado' | 'dt_criacao' | 'dt_atualizado' | 'status'>): Promise<productInterface | null> {
        const categoryId = this.findOrCreateCategory(data.categoria);
        const brandId = this.findOrCreateBrand(data.marca);

        const id = this.produtos.length + 1;

        const newProduct = {
            ...data,
            id: id,
            id_categoria: categoryId,
            id_marca: brandId,
            status: true,
            dt_deletado: null,
            dt_criacao: new Date(),
            dt_atualizado: null
        };

        this.produtos.push(newProduct);
        this.addToStory('Produto criado', newProduct.id);

        return newProduct;
    }
}

// Simulação de salvar um novo produto
async function simulateProducts() {
    const productRepo = new ProdutoInMemory(new CategoriaInMemory());

    // Exemplo de salvar um novo produto
    await productRepo.save({
        nome: 'Pasta de Dente',
        descricao: 'Pasta de dente com flúor para proteção contra cáries.',
        em_uso: false,
        id_clinica: 1,
        id_usuario_cadastro: 1,
        unidade_medida: 'un',
        dt_validade: new Date('2025-03-01'),
        categoria: 'Higiene Bucal', // nome da categoria
        marca: 'FreshMint' // nome da marca
    });

    // Exibir produtos e histórias
    console.log('Produtos:', productRepo.produtos);
    console.log('Histórias:', productRepo.story);
}

simulateProducts();
