"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const memory_produto_1 = require("../repositories/in-memory/memory-produto");
const productService_1 = require("./productService");
const memory_categoria_1 = require("../repositories/in-memory/memory-categoria");
const memory_marca_1 = require("../repositories/in-memory/memory-marca");
(0, vitest_1.describe)('SeriçoServiços Produto', () => {
    const memoryProduct = new memory_produto_1.ProdutoInMemory();
    const memoryBrand = new memory_marca_1.MarcaInMemory();
    const memoryCategory = new memory_categoria_1.CategoriaInMemory();
    const productService = new productService_1.ProductService(memoryProduct);
    (0, vitest_1.describe)('create', () => {
        (0, vitest_1.it)('Cadatro de produto com criação de nava categoria e marca => 201', async () => {
            const response = await productService.create({
                descricao: 'teste',
                dt_validade: new Date('2025-05-10'),
                id_clinica: 1,
                id_usuario_cadastro: 1,
                nome: 'rapadura mole',
                unidade_medida: 'un',
                nome_categoria: 'produto de teste',
                nome_marca: 'test'
            });
            (0, vitest_1.expect)(response).toEqual({ statusCode: 201, message: 'Product created successfully',
                data: {
                    id: vitest_1.expect.any(Number),
                    descricao: 'teste',
                    dt_validade: new Date('2025-05-10'),
                    em_uso: false,
                    id_clinica: 1,
                    id_usuario_cadastro: 1,
                    id_usuario_atualizacao: 1,
                    nome: 'rapadura mole',
                    status: true,
                    unidade_medida: 'un',
                    nome_categoria: 'produto de teste',
                    nome_marca: 'test',
                    dt_atualizado: null,
                    dt_criacao: vitest_1.expect.any(Date),
                    dt_deletado: null,
                }
            });
            return response;
        });
    });
});
