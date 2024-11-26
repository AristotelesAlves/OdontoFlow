"use client"

import { ArrowLeft, ArrowRight, ArrowsClockwise, ArrowsLeftRight, FirstAid } from "@phosphor-icons/react/dist/ssr";
import RootLayout from "../../components/layout/RootLayout";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import apiService from "../../serive/apiService";
import { DotsThree } from "@phosphor-icons/react";


export default function page(){

    const [data, setData] = useState([]); // Inicializando como um array vazio
    const [page, setPage] = useState(1); // Estado para a página atual
    const [limit] = useState(10); // Estado para a quantidade de registros por página
    const [home, setHome] = useState({
        entradas: 0,
        produto_uso: 0
    })

    // Função para buscar os dados com base na página e limite
    async function fetchData() {
        const response = await apiService({
            endPoint: `move?page=${page}&limit=${limit}`, 
            method: 'GET',
        });

        if (response.error) {
            console.error('Erro:', response.message); 
            setData([]); 
        } else {
            setData(response.movimentacoes || []);
        }

        const homest = await apiService({
            endPoint: `home`, 
            method: 'GET',
        });

        setHome(homest)
    }



    useEffect(() => {
        fetchData();
    }, [page]);


    return (
        <RootLayout>
            <div className="flex gap-2 items-center">
                <div className="rounded-3xl flex flex-col p-4 shadow-lg w-72 gap-2 bg-blue text-white">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full border border-white p-1">
                            <ArrowsLeftRight size={20}/>
                        </div>
                        <span className="text-xl">
                            Entradas e Saídas
                        </span>
                    </div>
                    <div className="flex items-end gap-1">
                        <strong className="text-6xl">
                            {home.entradas}
                        </strong>
                        <span>
                            Entradas/Saídas hoje
                        </span>
                    </div>
                </div>
                <div className="rounded-3xl flex flex-col p-4 shadow-lg w-72 gap-2 bg-teal text-zinc">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full border border-zinc p-1">
                            <FirstAid size={20} />
                        </div>
                        <span className="text-xl">
                            Produtos em
                        </span>
                    </div>
                    <div className="flex items-end gap-1 pb-1">
                        <strong className="text-6xl">
                            {home.produto_uso}
                        </strong>
                        <span className="w-32 text-wrap text leading-4">
                            Total de Produtos em uso 
                        </span>
                    </div>
                </div>
            </div>
            <table className="min-w-full w-full overflow-y-scroll">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-start ">Usuário</th>
                            <th className="px-4 py-2 text-start ">Destino</th>
                            <th className="px-4 py-2 text-start ">Data e hora</th>
                            <th className="px-4 py-2 text-start ">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map((mov, index) => (
                            <tr key={mov.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                <td className="px-4 py-2 text-start">{mov.usuario}</td>
                                <td className="px-4 py-2 text-start">{mov.destino} </td>
                                <td className="px-4 py-2 text-start">{new Date(mov.dt_movimentacao).toLocaleString()}</td> {/* Formata a data com hora */}
                                <td className="px-4 py-2 text-start">
                                    {mov.tipo === 'saida' && (
                                        <div className="flex gap-1 items-center text-red">
                                            <div className="p-1 rounded-full bg-red text-white">
                                                <ArrowLeft />
                                            </div>
                                            <span>Saída</span>
                                        </div>
                                    )}
                                    {mov.tipo === 'entrada' && (
                                        <div className="flex gap-1 items-center text-blue">
                                            <div className="p-1 rounded-full bg-blue text-white">
                                                <ArrowRight />
                                            </div>
                                            <span>Entrada</span>
                                        </div>
                                    )}
                                    {mov.tipo === 'uso' && (
                                        <div className="flex gap-1 items-center text-black">
                                            <div className="p-1 rounded-full bg-black text-white">
                                                <ArrowsClockwise/>
                                            </div>
                                            <span>Em uso</span>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="px-4 py-2 text-start ">Nenhuma movimentação encontrada</td>
                            </tr>
                        )}
                    </tbody>
            </table>
        </RootLayout>
    )
}