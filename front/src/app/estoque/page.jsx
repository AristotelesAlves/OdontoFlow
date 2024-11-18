"use client";
import RootLayout from "../../components/layout/RootLayout";
import { useState, useEffect } from "react";
import PagNavigation from "../../components/common/PagNavigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { CadastroProduto } from "../../components/modal/CadastroProduto";
import { Movimentacao } from "../../components/modal/Movimentacao";
import { ProdutoEmUso } from "../../components/modal/ProdutoUso";


export default function Page() {
    const [pagProdutoUso, setPagProdutoUso] = useState(false);
    const [openModal, setOpenModal] = useState({
        cadastroProduto: false,
        movimentacao: false,
        produtoUso: false,
    });
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    // Função para abrir o modal de cadastro de produto
    const openCadastroProduto = () => {
        setOpenModal((prev) => ({ ...prev, cadastroProduto: true }));
    };

    // Função para fechar o modal de cadastro de produto
    const closeCadastroProduto = () => {
        setOpenModal((prev) => ({ ...prev, cadastroProduto: false }));
    };

    // Função para abrir o modal de movimentação
    const openMovimentacao = () => {
        setOpenModal((prev) => ({ ...prev, movimentacao: true }));
    };

    // Função para fechar o modal de movimentação
    const closeMovimentacao = () => {
        setOpenModal((prev) => ({ ...prev, movimentacao: false }));
    };

    // Função para abrir o modal de produto em uso
    const openProdutoEmUso = () => {
        setOpenModal((prev) => ({ ...prev, produtoUso: true }));
    };

    // Função para fechar o modal de produto em uso
    const closeProdutoEmUso = () => {
        setOpenModal((prev) => ({ ...prev, produtoUso: false }));
    };

    // Função para buscar os produtos via API
    const fetchProdutos = async () => {
        try {
            const response = await fetch(`/products?page=${page}&limit=${limit}`);
            const result = await response.json();
            setData(result.data);
        } catch (error) {
            console.log('Erro ao buscar produtos:', error);
        }
    };

    useEffect(() => {
        fetchProdutos();
    }, [page, limit]); // Recarrega quando a página ou o limite mudar

    return (
        <RootLayout>
            <h1 className="font-bold text-blue text-5xl">Estoque</h1>
            <div className="w-full flex items-center justify-between">
                <nav>
                    {pagProdutoUso ? (
                        <div className="flex gap-2 items-center">
                            <button
                                onClick={() => setPagProdutoUso(false)}
                                className="py-2 px-4 shadow-xl rounded-3xl text-white bg-red"
                            >
                                Voltar lista de produtos
                            </button>
                            <button
                                className="py-2 px-4 shadow-xl rounded-3xl text-white bg-blue"
                                onClick={openProdutoEmUso}
                            >
                                Adicionar produto em uso
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <button
                                onClick={openCadastroProduto}
                                className="py-2 px-4 shadow-xl rounded-3xl text-white bg-blue"
                            >
                                Cadastro produto
                            </button>
                            <button
                                onClick={() => setPagProdutoUso(true)}
                                className="py-2 px-4 shadow-xl rounded-3xl text-white bg-gray-800"
                            >
                                Produto em uso
                            </button>
                            <button
                                onClick={openMovimentacao}
                                className="py-2 px-4 shadow-xl rounded-3xl text-white bg-red"
                            >
                                Movimentação
                            </button>
                        </div>
                    )}
                </nav>
                <PagNavigation
                    page={page}
                    setPage={setPage}
                    ArrowLeft={ArrowLeft}
                    ArrowRight={ArrowRight}
                />
            </div>
            {pagProdutoUso ? (
                <table>
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-start ">ID</th>
                            <th className="px-4 py-2 text-start ">Produto</th>
                            <th className="px-4 py-2 text-start ">Quantidade</th>
                            <th className="px-4 py-2 text-start ">Marca</th>
                            <th className="px-4 py-2 text-start ">Categoria</th>
                            <th className="px-4 py-2 text-start ">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((produto) => (
                            <tr key={produto.id}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.qt_estoque}</td>
                                <td>{produto.nome_marca}</td>
                                <td>{produto.nome_categoria}</td>
                                <td>
                                    <button
                                        onClick={() => console.log('Editar produto')}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => console.log('Excluir produto')}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-start ">ID</th>
                            <th className="px-4 py-2 text-start ">Produto</th>
                            <th className="px-4 py-2 text-start ">Quantidade</th>
                            <th className="px-4 py-2 text-start ">Data</th>
                            <th className="px-4 py-2 text-start ">Ação</th>
                        </tr>
                    </thead>
                </table>
            )}

            {/* Modais */}
            {openModal.cadastroProduto && (<CadastroProduto onClose={closeCadastroProduto}/>)}
            {openModal.movimentacao && <Movimentacao onClose={closeMovimentacao}/>}
            {openModal.produtoUso && <ProdutoEmUso onClose={closeProdutoEmUso} />}
        </RootLayout>
    );
}
