import { describe, it, expect, beforeEach } from 'vitest';
import { ProdutoInMemory } from './memory-produto';

describe('ProdutoInMemory', () => {
    let repository: ProdutoInMemory
    ;

    beforeEach(() => {
        repository = new ProdutoInMemory();
    });

    it('deve salvar um novo produto', async () => {
        const newProduct = await repository.save({
            nome: 'Novo Produto',
            descricao: 'Descrição do novo produto',
            id_clinica: 1,
            id_usuario_cadastro: 1,
            nome_categoria: 'Higiene',
            nome_marca: 'NovaMarca',
            qt_estoque: 50,
            qt_compra: 20,
            qt_minima: 10,
            preco: 30,
            unidade_medida: 'un',
            dt_validade: new Date('2025-12-31')
        });

        expect(newProduct).not.toBeNull();
        expect(newProduct?.nome).toBe('Novo Produto');
    });

    it('deve listar todos os produtos com paginação', async () => {
        await repository.save({
            nome: 'Produto 1',
            descricao: 'Descrição do produto 1',
            id_clinica: 1,
            id_usuario_cadastro: 1,
            nome_categoria: 'Higiene',
            nome_marca: 'Marca1',
            qt_estoque: 10,
            qt_compra: 5,
            qt_minima: 2,
            preco: 10,
            unidade_medida: 'un',
            dt_validade: new Date('2025-12-31')
        });
    
        await repository.save({
            nome: 'Produto 2',
            descricao: 'Descrição do produto 2',
            id_clinica: 1,
            id_usuario_cadastro: 1,
            nome_categoria: 'Higiene',
            nome_marca: 'Marca2',
            qt_estoque: 20,
            qt_compra: 10,
            qt_minima: 5,
            preco: 20,
            unidade_medida: 'un',
            dt_validade: new Date('2025-12-31')
        });

        const {produtos, total} = await repository.findAll(2, 1);

        expect(produtos.length).toBe(1);
        expect(produtos[0].nome).toBe('produto para fins de teste');
        expect(total).toBe(4);
    });

    it('deve buscar um produto pelo ID', async () => {
        const savedProduct = await repository.save({
            nome: 'Produto Teste',
            descricao: 'Descrição do produto teste',
            id_clinica: 1,
            id_usuario_cadastro: 1,
            nome_categoria: 'Higiene',
            nome_marca: 'MarcaTeste',
            qt_estoque: 5,
            qt_compra: 2,
            qt_minima: 1,
            preco: 15,
            unidade_medida: 'un',
            dt_validade: new Date('2025-12-31')
        });

        const foundProduct = await repository.findById(savedProduct!.id);
        expect(foundProduct).not.toBeNull();
        expect(foundProduct?.nome).toBe('Produto Teste');
    });

    it('deve atualizar um produto existente', async () => {
        const savedProduct = await repository.save({
            nome: 'Produto Para Atualizar',
            descricao: 'Descrição do produto para atualizar',
            id_clinica: 1,
            id_usuario_cadastro: 1,
            nome_categoria: 'Higiene',
            nome_marca: 'MarcaAtualizar',
            qt_estoque: 7,
            qt_compra: 3,
            qt_minima: 1,
            preco: 25,
            unidade_medida: 'un',
            dt_validade: new Date('2025-12-31')
        });

        const updatedProduct = await repository.update(savedProduct!.id, {
            nome: 'Produto Atualizado',
            preco: 30
        });

        expect(updatedProduct).not.toBeNull();
        expect(updatedProduct?.nome).toBe('Produto Atualizado');
        expect(updatedProduct?.preco).toBe(30);
    });

    it('deve marcar um produto como deletado', async () => {
        const savedProduct = await repository.save({
            nome: 'Produto Para Deletar',
            descricao: 'Descrição do produto para deletar',
            id_clinica: 1,
            id_usuario_cadastro: 1,
            nome_categoria: 'Higiene',
            nome_marca: 'MarcaDeletar',
            qt_estoque: 2,
            qt_compra: 1,
            qt_minima: 1,
            preco: 12,
            unidade_medida: 'un',
            dt_validade: new Date('2025-12-31')
        });

        const deleteResult = await repository.delete(savedProduct!.id);
        expect(deleteResult).toBe(true);

        const foundProduct = await repository.findById(savedProduct!.id);
        expect(foundProduct?.dt_deletado).not.toBeNull();
    });
});
