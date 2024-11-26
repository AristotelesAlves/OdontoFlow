"use client";
import RootLayout from "../../components/layout/RootLayout";
import { useState, useEffect } from "react";
import PagNavigation from "../../components/common/PagNavigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import ProdutoModal from "../../components/modal/CadastroProduto";
import { Movimentacao } from "../../components/modal/Movimentacao";
import { ProdutoEmUso } from "../../components/modal/ProdutoUso";
import apiService from "../../serive/apiService";
import { Check, DotsThree } from "@phosphor-icons/react/dist/ssr";

export default function Page() {
    const [pagProdutoUso, setPagProdutoUso] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null); 
    const [openModal, setOpenModal] = useState({
        cadastroProduto: false,
        movimentacao: false,
        produtoUso: false,
    });
    const [data, setData] = useState([]);
    const [dataPtUso, setDataPtUso] = useState([])
    const [page, setPage] = useState(1);
    const [typeModalProduto, setTypeModalProduto] = useState('cadastro');
    const [idProdutoSelecionado, setIdProdutoSelecionado] = useState(0);
    const [limit] = useState(10);

    async function fetchData() {
        const response = await apiService({
            endPoint: pagProdutoUso? `products/uso?page=${page}&limit=${limit}` : `products?page=${page}&limit=${limit}`, 
            method: 'get',
        });
        if(response){
            if(pagProdutoUso){
                console.log(response)
                setDataPtUso(response)
                return
            }
            setData(response.produtos);
            return
        }
    }

    useEffect(() => {
        fetchData();
    }, [page,pagProdutoUso, openModal,activeMenu]);

    const openCadastroProduto = (type, id) => {
        setTypeModalProduto(type);
        setIdProdutoSelecionado(id);
        setActiveMenu(null)
        setOpenModal((prev) => ({ ...prev, cadastroProduto: true }));
    };

    const closeCadastroProduto = () => {
        setOpenModal((prev) => ({ ...prev, cadastroProduto: false }));
    };

    const openMovimentacao = () => {
        setOpenModal((prev) => ({ ...prev, movimentacao: true }));
    };

    const closeMovimentacao = () => {
        setOpenModal((prev) => ({ ...prev, movimentacao: false }));
    };

    const openProdutoEmUso = () => {
        setOpenModal((prev) => ({ ...prev, produtoUso: true }));
    };

    const closeProdutoEmUso = () => {
        setOpenModal((prev) => ({ ...prev, produtoUso: false }));
    };

    const toggleStatus = (id) => {
        setData((prevData) =>
            prevData.map((produto) =>
                produto.id === id ? { ...produto, status: !produto.status } : produto
            )
        );
    };

    const saidaProdutoUso = (id) => {
        const api = apiService({
            endPoint: `product/uso/saida?id=${id}`,
            method: 'put'
        })
        setActiveMenu(false)
        console.log(api)
    }

    return (
        <RootLayout>
            <h1 className="font-bold text-blue text-5xl">
                {pagProdutoUso ? 'Produtos em Uso' : 'Estoque'}
            </h1>
            <div className="w-full flex items-center justify-between">
                <nav>
                    {pagProdutoUso ? (
                        <div className="flex gap-2 items-center">
                            <button
                                onClick={() => setPagProdutoUso(false)}
                                className="py-2 px-4 shadow-xl rounded-3xl text-white bg-red"
                            >
                                Voltar à Lista de Produtos
                            </button>
                            <button
                                className="py-2 px-4 shadow-xl rounded-3xl text-white bg-blue"
                                onClick={openProdutoEmUso}
                            >
                                Adicionar Produto em Uso
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <button
                                onClick={() => openCadastroProduto('cadastro', 0)}
                                className="py-2 px-4 shadow-xl rounded-3xl text-white bg-blue"
                            >
                                Cadastro Produto
                            </button>
                            <button
                                onClick={() => setPagProdutoUso(true)}
                                className="py-2 px-4 shadow-xl rounded-3xl text-white bg-gray-800"
                            >
                                Produto em Uso
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
            <table className="w-full mt-4 border-collapse">
                <thead>
                    
                        {pagProdutoUso ? (
                            <tr>
                                <th className="px-4 py-2 text-start">Produto</th>
                                <th className="px-4 py-2 text-start">Quantidade</th>
                                <th className="px-4 py-2 text-start">Data de uso</th>
                                <th className="px-4 py-2 text-start">Data saída</th>

                            </tr>
                        ) : (
                            <tr>
                                <th className="px-4 py-2 text-start">Produto</th>
                                <th className="px-4 py-2 text-start">Marca</th>
                                <th className="px-4 py-2 text-start">Quantidade</th>
                                <th className="px-4 py-2 text-start">Fornecedor</th>
                                <th className="px-4 py-2 text-start">Status</th>
                            </tr>
                        )}
                </thead>
                <tbody>
                {pagProdutoUso ? (
                    dataPtUso.map((PtUso, index) => (
                        <tr
                        key={PtUso.id}
                        className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                        >
                            <td className="px-4 py-2 text-start">{PtUso.produto.nome}</td>

                            <td className="px-4 py-2 text-start">{PtUso.quantidade} Unidades</td>
                            <td className="px-4 py-2 text-start">
                                {new Date(PtUso.dt_inicio).getDate()}/
                                {new Date(PtUso.dt_inicio).getMonth()}/
                                {new Date(PtUso.dt_inicio).getFullYear()} - {new Date(PtUso.dt_inicio).getHours()}:{new Date(PtUso.dt_inicio).getMinutes()}
                            </td>
                            <td className="px-4 py-2 text-start">{PtUso.dt_fim == null ? '' : (
                                `
                                ${new Date(PtUso.dt_fim).getDate()}/
                                ${new Date(PtUso.dt_fim).getMonth()}/
                                ${new Date(PtUso.dt_fim).getFullYear()} - ${new Date(PtUso.dt_fim).getHours()}:${new Date(PtUso.dt_fim).getMinutes()}
                                `
                            )}</td>

                            <td className="px-4 py-2 relative">
                                {
                                    PtUso.dt_fim != null ? '' : (
                                        <button onClick={() => saidaProdutoUso(PtUso.id)}>
                                            <Check/>
                                        </button>
                                    )
                                }
                            </td>
                        </tr>
                    ))
                ): (
                    data.map((produto, index) => (
                        <tr
                            key={produto.id}
                            className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                        >
                            <td className="px-4 py-2 text-start">{produto.nome}</td>
                            <td className="px-4 py-2 text-start">{produto.marca}</td>
                            <td className="px-4 py-2 text-start">{produto.quantidade} Unidades</td>
                            <td className="px-4 py-2 text-start">{produto.fornecedor}</td>
                            <td className="px-4 py-2 text-start flex gap-2 items-center">
                                <div className={`w-4 h-4 rounded-full ${produto.status ? 'bg-green-500': 'bg-red'} `}>
                                </div>
                                <span className={`${produto.status ? 'text-green-500': 'text-red'} `}>
                                    {produto.status ? 'Ativo': 'Desativado'}
                                </span>
                            </td>
                            <td className="px-4 py-2 text-start">{produto.nome_categoria}</td>
                            <td className="relative">
                                {/* Botão para abrir/fechar o menu */}
                                <button onClick={() => openCadastroProduto('edit', produto.id)}>
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))
                )}

                </tbody>
            </table>

            {/* Modais */}
            {openModal.cadastroProduto && (
                <ProdutoModal
                    onClose={closeCadastroProduto}
                    type={typeModalProduto}
                    id={idProdutoSelecionado}
                />
            )}
            {openModal.movimentacao && <Movimentacao onClose={closeMovimentacao} />}
            {openModal.produtoUso && <ProdutoEmUso onClose={closeProdutoEmUso} />}
        </RootLayout>
    );
}
