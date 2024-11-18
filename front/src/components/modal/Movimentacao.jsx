import { useState, useEffect } from "react"; 
import LayoutModal from "../layout/LayoutModal";
import InputWithLabel from "../common/Input";

export function Movimentacao({ onClose }) {
    const [destino, setDestino] = useState(''); // Destino da movimentação
    const [tipo, setTipo] = useState(''); // Tipo de movimentação (Entrada ou Saída)
    const [produtoMovimentacao, setProdutoMovimentacao] = useState([]); // Lista de produtos selecionados
    const [searchTerm, setSearchTerm] = useState(""); // Termo de busca
    const [produtos, setProdutos] = useState([]); // Lista de produtos filtrados

    // Produtos simulados para pesquisa
    const produtosMockados = [
        { id: "1", nome: "Produto A" },
        { id: "2", nome: "Produto B" },
        { id: "3", nome: "Produto C" },
        { id: "4", nome: "Produto D" },
        { id: "5", nome: "Produto E" },
    ];

    // Função de pesquisa para filtrar os produtos
    const fetchProdutos = () => {
        if (searchTerm.length >= 2) {
            const produtosFiltrados = produtosMockados.filter((produto) =>
                produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setProdutos(produtosFiltrados);
        } else {
            setProdutos(produtosMockados);
        }
    };

    // Efeito para filtrar os produtos quando o termo de pesquisa mudar
    useEffect(() => {
        fetchProdutos();
    }, [searchTerm]);

    // Função para adicionar um produto à lista de movimentação
    const adicionarProduto = (produto) => {
        setProdutoMovimentacao((prevProdutos) => [
            ...prevProdutos,
            { ...produto, quantidade: 1 }, // Adiciona uma quantidade inicial de 1
        ]);
        setSearchTerm(""); // Limpar a busca após adicionar o produto
    };

    // Função para atualizar a quantidade de um produto
    const atualizarQuantidade = (id, quantidade) => {
        setProdutoMovimentacao((prevProdutos) =>
            prevProdutos.map((produto) =>
                produto.id === id ? { ...produto, quantidade } : produto
            )
        );
    };

    // Função para remover um produto da lista de movimentação
    const removerProduto = (produtoId) => {
        setProdutoMovimentacao((prevProdutos) =>
            prevProdutos.filter((produto) => produto.id !== produtoId)
        );
    };

    // Função para enviar os dados para o backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        const movimentacao = {
            destino,
            tipo,
            id_clinica: 123, // ID da clínica
            id_usuario: 456, // ID do usuário
            produto_movimentacao,
        };

        try {
            await fetch("/move", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movimentacao),
            });

            // Fechar modal após envio
            onClose();
        } catch (error) {
            console.error("Erro ao registrar movimentação", error);
        }
    };

    return (
        <LayoutModal>
            <form onSubmit={handleSubmit} className="flex gap-2 flex-col min-w-96">
                <h1 className="font-semibold py-1">Cadastro de Movimentação</h1>

                {/* Campo de Destino */}
                <InputWithLabel
                    label="Destino"
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    placeholder={'Informe o destino'}
                />

                {/* Campo de Tipo de Movimentação (Entrada ou Saída) */}
                <div>
                    <label className="font-medium">Tipo de Movimentação</label>
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="py-2 px-4 border rounded-md w-full mt-1"
                    >
                        <option value="">Selecione o tipo</option>
                        <option value="entrada">Entrada</option>
                        <option value="saida">Saída</option>
                    </select>
                </div>

                {/* Campo de Pesquisa de Produtos */}
                <div className="relative">
                    <InputWithLabel
                        label="Pesquisar Produto"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Digite o nome do produto"
                    />
                    {searchTerm && produtos.length > 0 && (
                        <ul className="absolute w-full bg-white border border-gray-300 mt-1 max-h-48 overflow-y-auto z-10">
                            {produtos.map((produto) => (
                                <li
                                    key={produto.id}
                                    className="cursor-pointer p-2 hover:bg-gray-200"
                                    onClick={() => adicionarProduto(produto)}
                                >
                                    {produto.nome}
                                </li>
                            ))}
                        </ul>
                    )}
                    {searchTerm && produtos.length === 0 && (
                        <div className="absolute w-full bg-white border border-gray-300 mt-1 text-gray-500 p-2">
                            Nenhum produto encontrado
                        </div>
                    )}
                </div>

                {/* Exibição dos produtos adicionados */}
                {produtoMovimentacao.length > 0 && (
                    <div className="mt-4 max-h-48 overflow-y-auto">
                        <h2 className="font-medium">Produtos Adicionados:</h2>
                        <ul className="space-y-2">
                            {produtoMovimentacao.map((produto) => (
                                <li
                                    key={produto.id}
                                    className="flex justify-between items-center py-2 px-4 bg-gray-100 rounded-md"
                                >
                                    <div>
                                        <span>{produto.nome}</span>
                                        {/* Campo de quantidade */}
                                        <div className="flex items-center mt-1">
                                            <label htmlFor={`quantidade-${produto.id}`} className="mr-2">
                                                Quantidade:
                                            </label>
                                            <input
                                                id={`quantidade-${produto.id}`}
                                                type="text"
                                                value={produto.quantidade}
                                                min="1"
                                                onChange={(e) =>
                                                    atualizarQuantidade(produto.id, Number(e.target.value))
                                                }
                                                className="w-16 p-1 border rounded-md text-center"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="text-red-500"
                                        onClick={() => removerProduto(produto.id)}
                                    >
                                        Remover
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Botões */}
                <div className="flex gap-1 items-center mt-4">
                    <button
                        onClick={onClose}
                        className="py-1 bg-zinc-opacity text-white rounded-md w-full"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="py-1 bg-blue text-white rounded-md w-full"
                    >
                        Confirmar
                    </button>
                </div>
            </form>
        </LayoutModal>
    );
}
