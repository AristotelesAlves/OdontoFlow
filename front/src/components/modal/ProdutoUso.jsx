import { useState, useEffect } from "react";
import LayoutModal from "../layout/LayoutModal";
import InputWithLabel from "../common/Input";
import apiService from "../../serive/apiService";

export function ProdutoEmUso({ onClose }) {
    const [showDropdown, setShowDropdown] = useState(false); // Controla a visibilidade da lista
    const [produtoUso, setProdutoUso] = useState(""); // Armazenar o produto selecionado
    const [quantidade, setQuantidade] = useState(0);
    const [produtos, setProdutos] = useState([]); // Lista de produtos simulada
    const [searchTerm, setSearchTerm] = useState(""); // Termo de busca

    // Lista de produtos simulada para testar a funcionalidade
    const [produtosMockados, setProdutosMockados] = useState([])

    // Função de pesquisa simulada
    const fetchProdutos = () => {
        if (searchTerm.length >= 2) {
            // Filtrando produtos com base no termo de busca
            const produtosFiltrados = produtosMockados.filter((produto) =>
                produto.nome.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setProdutos(produtosFiltrados);
        } else {
            // Se o termo de pesquisa tiver menos de 2 caracteres, mostra todos os produtos
            setProdutos(produtosMockados);
        }
    };

    // Efeito para buscar produtos sempre que o searchTerm mudar
    useEffect(() => {
        async function listPt(){
            const service = await apiService({
                endPoint: 'product/buscar',
                method: 'get'
            })
            setProdutosMockados(service)
        }
        listPt()
        fetchProdutos();
    }, [searchTerm]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const produtoEmUso = {
            produtoUso,  // ID do produto
            quantidade,
        };

        // Simulação do envio para o backend
        try {
            const service = await apiService({
                endPoint: 'product/uso',
                body:{
                    id_produto: produtoUso,
                    quantidade: quantidade,
                },
                method:'post'
            })
            if(service){
                console.log('Deu certo!')
            }
            onClose();
        } catch (error) {
            console.error("Erro ao registrar produto em uso", error);
        }
    };

    return (
        <LayoutModal>
            <form onSubmit={handleSubmit} className="flex gap-2 flex-col min-w-96">
                <h1 className="font-semibold py-1">Produto em Uso</h1>

                {/* Campo de pesquisa */}
                <div className="relative">
                <InputWithLabel
                    placeholder="Pesquisar produto"
                    label="Produto"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value); 
                        setShowDropdown(e.target.value.length >= 2); // Exibe a lista apenas com 2 ou mais caracteres
                    }}
                />


                    {/* Caixa de produtos filtrados com posição relativa */}
                    {searchTerm.length >= 2 && showDropdown && (
                        <div className="absolute top-full left-0 w-full max-h-40 overflow-auto mt-2 border border-gray-300 rounded-md bg-white z-10">
                            {produtos.length > 0 ? (
                                produtos.map((produto) => (
                                    <div
                                        key={produto.id}
                                        className="cursor-pointer p-2 hover:bg-gray-100 rounded-md"
                                        onClick={() => {
                                            console.log(produto)
                                            setProdutoUso(produto.id);
                                            setSearchTerm(produto.nome)
                                            setShowDropdown(false);   // Oculta a lista
                                        }}
                                    >
                                        {produto.nome}
                                    </div>
                                ))
                            ) : (
                                <div className="p-2 text-center text-gray-500">
                                    Nenhum produto encontrado
                                </div>
                            )}
                        </div>
                    )}

                </div>

                {/* Campo de quantidade */}
                <InputWithLabel
                    placeholder="Quantidade"
                    label="Quantidade"
                    type="number"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                />

                <div className="flex gap-1 items-center">
                    <button onClick={onClose} className="py-1 bg-zinc-opacity text-white rounded-md w-full">
                        Cancelar
                    </button>
                    <button type="submit" className="py-1 bg-blue text-white rounded-md w-full">
                        Confirmar
                    </button>
                </div>
            </form>
        </LayoutModal>
    );
}
