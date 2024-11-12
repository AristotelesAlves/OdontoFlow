"use client"

import { ArrowsLeftRight, FirstAid } from "@phosphor-icons/react/dist/ssr";
import RootLayout from "../../components/layout/RootLayout";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import apiService from "../../serive/apiService";
import { DotsThree } from "@phosphor-icons/react";


export default function page(){

    const [data, setData] = useState([]); // Inicializando como um array vazio
    const [page, setPage] = useState(1); // Estado para a página atual
    const [limit] = useState(10); // Estado para a quantidade de registros por página

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
                            22
                        </strong>
                        <span>
                            Entradas/Saídas hoje
                        </span>
                    </div>
                    <ul className="flex w-full">
                        <li className="flex flex-col items-center justify-center w-full">
                            <span className="text-2xl">
                                10
                            </span>
                            <span className="text-base">
                                8h
                            </span>
                        </li>
                        <li className="flex flex-col items-center justify-center w-full border-x border-white">
                            <span className="text-2xl">
                                10
                            </span>
                            <span className="text-base">
                                8h
                            </span>
                        </li>
                        <li className="flex flex-col items-center justify-center w-full">
                            <span className="text-2xl">
                                10
                            </span>
                            <span className="text-base">
                                8h
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="rounded-3xl flex flex-col p-4 shadow-lg w-72 gap-2 bg-teal text-zinc">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full border border-zinc p-1">
                            <FirstAid size={20} />
                        </div>
                        <span className="text-xl">
                            Entradas e Saídas
                        </span>
                    </div>
                    <div className="flex items-end gap-1 pb-1">
                        <strong className="text-6xl">
                            30
                        </strong>
                        <span className="w-32 text-wrap text leading-4">
                            Produtos em uso 
                            essa semana
                        </span>
                    </div>
                    <ul className="flex w-full">
                        <li className="flex flex-col items-center justify-center w-full">
                            <span className="text-2xl">
                                10
                            </span>
                            <span className="text-base">
                                Seg
                            </span>
                        </li>
                        <li className="flex flex-col items-center justify-center w-full border-x border-zinc border-opacity-40">
                            <span className="text-2xl">
                                10
                            </span>
                            <span className="text-base">
                                Ter
                            </span>
                        </li>
                        <li className="flex flex-col items-center justify-center w-full">
                            <span className="text-2xl">
                                10
                            </span>
                            <span className="text-base">
                                Qua
                            </span>
                        </li>
                        <li className="flex flex-col items-center justify-center w-full border-x border-zinc border-opacity-40">
                            <span className="text-2xl">
                                10
                            </span>
                            <span className="text-base">
                                Qui
                            </span>
                        </li>
                        <li className="flex flex-col items-center justify-center w-full">
                            <span className="text-2xl">
                                10
                            </span>
                            <span className="text-base">
                                Sex
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-start ">ID</th>
                            <th className="px-4 py-2 text-start ">Usuário</th>
                            <th className="px-4 py-2 text-start ">Destino</th>
                            <th className="px-4 py-2 text-start ">Data Movimentação</th>
                            <th className="px-4 py-2 text-start ">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map((mov) => (
                            <tr key={mov.id} className={`-b ${mov.estorno ? 'bg-gray-200' : ''}`}>
                                <td className="px-4 py-2 text-start">{mov.id}</td>
                                <td className="px-4 py-2 text-start">{mov.usuario}</td>
                                <td className="px-4 py-2 text-start">{mov.destino}</td>
                                <td className="px-4 py-2 text-start">{new Date(mov.dt_movimentacao).toLocaleString()}</td> {/* Formata a data com hora */}
                                <td className="px-4 py-2 text-start">
                                    {mov.estorno ? (
                                        <span className="text-red-500"><X size={20} /></span> // Ícone de X para estornados
                                    ) : (
                                        <div className="relative">
                                            <button 
                                                className="font-bold p-1 rounded-full hover:bg-stone-950 hover:bg-opacity-20" 
                                                onClick={() => handleEstorno(mov.id)}
                                            >
                                                <DotsThree size={20} />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="px-4 py-2 text-start text-center">Nenhuma movimentação encontrada</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </RootLayout>
    )
}