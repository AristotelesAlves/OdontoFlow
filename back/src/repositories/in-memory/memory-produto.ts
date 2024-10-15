import { productInterface } from "../../domain/interface/productInterface";
import { ProductRepositoryInterface } from "../../domain/repository/productRepositoryInterface";

export class ProdutoInMemory implements ProductRepositoryInterface {
    private produtos: productInterface[] = [
        {
            id: 1,
            nome: 'Antisséptico Bucal',
            descricao: 'Antisséptico para uso bucal, ideal para reduzir a placa bacteriana.',
            em_uso: false,
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
        },
        {
            id: 2,
            nome: 'Fio Dental',
            descricao: 'Fio dental para limpeza entre os dentes.',
            em_uso: false,
            id_categoria: 2,
            id_clinica: 1,
            id_marca: 2,
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
            nome: 'Escova de Dentes',
            descricao: 'Escova de dentes macia, indicada para uso diário.',
            em_uso: true,
            id_categoria: 1,
            id_clinica: 1,
            id_marca: 3,
            id_usuario_atualizacao: null,
            id_usuario_cadastro: 1,
            status: true,
            unidade_medida: 'un',
            dt_validade: new Date('2025-01-15'),
            dt_criacao: new Date(),
            dt_atualizado: null,
            dt_deletado: null,
        },
        {
            id: 4,
            nome: 'Pasta de Dente',
            descricao: 'Pasta de dente com flúor para proteção contra cáries.',
            em_uso: false,
            id_categoria: 3,
            id_clinica: 1,
            id_marca: 4,
            id_usuario_atualizacao: null,
            id_usuario_cadastro: 1,
            status: true,
            unidade_medida: 'un',
            dt_validade: new Date('2025-03-01'),
            dt_criacao: new Date(),
            dt_atualizado: null,
            dt_deletado: null,
        },
        {
            id: 5,
            nome: 'Luvas de Procedimento',
            descricao: 'Luvas descartáveis para uso em procedimentos odontológicos.',
            em_uso: true,
            id_categoria: 4,
            id_clinica: 1,
            id_marca: 5,
            id_usuario_atualizacao: null,
            id_usuario_cadastro: 1,
            status: true,
            unidade_medida: 'cx',
            dt_validade: new Date('2024-12-01'),
            dt_criacao: new Date(),
            dt_atualizado: null,
            dt_deletado: null,
        }
    ];

    async save(data: Omit<productInterface, 'id' | 'dt_deletado' | 'dt_criacao' | 'dt_atualizado'| 'status' | 'em_uso'>): Promise<productInterface | null> {

        const id = this.produtos.length + 1;
        
        const newProduct = {
            ...data, 
            id: id,
            status: true,
            em_uso: false,
            dt_deletado: null,
            dt_criacao: new Date(),
            dt_atualizado: null
        }

        this.produtos.push(newProduct);

        return newProduct;
    }
}
