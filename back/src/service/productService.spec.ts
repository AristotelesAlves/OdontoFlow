import { describe, it, expect, vi } from 'vitest';
import { ProdutoInMemory } from '../repositories/in-memory/memory-produto';
import { ProductService } from './productService';
import { CategoriaInMemory } from '../repositories/in-memory/memory-categoria';
import { MarcaInMemory } from '../repositories/in-memory/memory-marca';

describe('SeriçoServiços Produto', () => {
    const memoryProduct = new ProdutoInMemory();
    const memoryBrand = new MarcaInMemory();
    const memoryCategory = new CategoriaInMemory();
    
    const productService = new ProductService(memoryProduct, memoryCategory, memoryBrand);
    

    describe('create', () => {
        it('Cadatro de produto com criação de nava categoria e marca => 201', async () => {
            const response = await productService.create({
                descricao: 'teste',
                dt_validade: new Date('2025-05-10'),
                em_uso: false,
                id_clinica: 1,
                id_usuario_cadastro: 1,
                id_usuario_atualizacao: 1,
                nome: 'rapadura mole',
                status: true,
                unidade_medida: 'un',
                nome_categoria:'produto de teste',
                nome_marca: 'test'

            });
            expect(response).toEqual({ statusCode: 201, message: 'Product created successfully',
                data: {
                    id: expect.any(Number),
                    descricao: 'teste',
                    dt_validade: new Date('2025-05-10'),
                    em_uso: false,
                    id_clinica: 1,
                    id_usuario_cadastro: 1,
                    id_usuario_atualizacao: 1,
                    nome: 'rapadura mole',
                    status: true,
                    unidade_medida: 'un',
                    nome_categoria:'produto de teste',
                    nome_marca: 'test',
                    dt_atualizado: null,
                    dt_criacao: expect.any(Date),
                    dt_deletado: null,
                }
             });
            return response
        });
    })
})