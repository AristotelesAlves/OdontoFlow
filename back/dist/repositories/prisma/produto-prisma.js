"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProdutoPrismaRepository = void 0;
const prisma_1 = require("../../config/prisma");
class ProdutoPrismaRepository {
    async save(data) {
        let categoria = await prisma_1.prisma.categoria.findUnique({
            where: { nome: data.nome_categoria }
        });
        if (!categoria) {
            categoria = await prisma_1.prisma.categoria.create({
                data: { nome: data.nome_categoria }
            });
        }
        let marca = await prisma_1.prisma.marca.findUnique({
            where: { nome: data.nome_marca }
        });
        if (!marca) {
            marca = await prisma_1.prisma.marca.create({
                data: { nome: data.nome_marca }
            });
        }
        const newProduct = await prisma_1.prisma.produto.create({
            data: {
                nome: data.nome,
                descricao: data.descricao,
                data_validade: data.data_validade,
                unidade_medida: data.unidade_medida,
                id_categoria: categoria.id,
                fornecedor: data.fornecedor,
                id_marca: marca.id,
                id_usuario_cadastro: data.id_usuario_cadastro,
                id_clinica: data.id_clinica,
                preco: data.preco,
                status: true,
                id_usuario_atualizacao: data.id_usuario_cadastro
            },
        });
        await prisma_1.prisma.estoque.create({
            data: {
                id_produto: newProduct.id,
                id_clinica: data.id_clinica,
                estoque: data.qt_estoque,
                quantidade_minima: data.qt_minima,
            },
        });
        return newProduct;
    }
    async findAll(page, limit) {
        const total = await prisma_1.prisma.produto.count();
        const produtos = await prisma_1.prisma.produto.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                marca: true,
                estoques: true,
            },
        });
        const formattedProdutos = produtos.map((produto) => {
            const quantidadeTotal = produto.estoques.reduce((total, estoque) => total + estoque.estoque, 0);
            return {
                id: produto.id,
                nome: produto.nome,
                descricao: produto.descricao,
                marca: produto.marca?.nome || "Sem marca",
                quantidade: quantidadeTotal,
                fornecedor: produto.fornecedor || "Não informado", // Ajuste conforme o relacionamento
                status: produto.status,
            };
        });
        return {
            produtos: formattedProdutos,
            total
        };
    }
    async findById(id) {
        return await prisma_1.prisma.produto.findUnique({
            where: { id },
            include: {
                categoria: true,
                estoques: true,
                marca: true,
            }
        });
    }
    async update(id, data) {
        // Passo 1: Recupera o registro atual do banco de dados
        const currentProduct = await prisma_1.prisma.produto.findUnique({
            where: { id },
            select: { id_categoria: true, id_marca: true } // Somente os campos que serão verificados
        });
        if (!currentProduct) {
            throw new Error('Produto não encontrado.');
        }
        // Inicializa os campos de id com os valores atuais
        let id_categoria = currentProduct.id_categoria;
        let id_marca = currentProduct.id_marca;
        // Passo 2: Verifica e cria nova categoria, se necessário
        if (data.nome_categoria) {
            const categoriaAtual = await prisma_1.prisma.categoria.findUnique({
                where: { id: id_categoria }
            });
            if (!categoriaAtual || categoriaAtual.nome !== data.nome_categoria) {
                const novaCategoria = await prisma_1.prisma.categoria.create({
                    data: { nome: data.nome_categoria }
                });
                id_categoria = novaCategoria.id; // Usa o novo ID da categoria criada
            }
        }
        else if (data.id_categoria) {
            id_categoria = data.id_categoria;
        }
        // Passo 3: Verifica e cria nova marca, se necessário
        if (data.nome_marca) {
            const marcaAtual = await prisma_1.prisma.marca.findUnique({
                where: { id: id_marca }
            });
            if (!marcaAtual || marcaAtual.nome !== data.nome_marca) {
                const novaMarca = await prisma_1.prisma.marca.create({
                    data: { nome: data.nome_marca }
                });
                id_marca = novaMarca.id; // Usa o novo ID da marca criada
            }
        }
        else if (data.id_marca) {
            id_marca = data.id_marca;
        }
        // Passo 4: Atualiza o produto com os novos IDs de categoria e marca, se criados
        const updatedProduct = await prisma_1.prisma.produto.update({
            where: { id },
            data: {
                data_validade: data.data_validade,
                descricao: data.descricao,
                dt_atualizado: new Date(),
                id_categoria,
                id_marca,
                id_usuario_atualizacao: data.id_usuario_atualizacao,
                nome: data.nome,
                preco: data.preco,
                status: data.status,
                unidade_medida: data.unidade_medida
            },
        });
        return updatedProduct;
    }
    async delete(id) {
        const product = await prisma_1.prisma.produto.update({
            where: { id },
            data: { dt_deletado: new Date(), status: false },
        });
        return product !== null;
    }
}
exports.ProdutoPrismaRepository = ProdutoPrismaRepository;
