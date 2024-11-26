"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import RootLayout from "../../components/layout/RootLayout";
import PagNavigation from "../../components/common/PagNavigation";
import apiService from "../../serive/apiService";
import { DotsThree, X, ArrowsClockwise } from '@phosphor-icons/react';

export default function Page() {
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

    console.log(data); 

    const handleEstorno = (id) => {

        console.log(`Estornar movimentação com ID: ${id}`);
    };

    return (
        <RootLayout>
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-blue text-5xl">Histórico</h1>
                <PagNavigation 
                    page={page} 
                    setPage={setPage} 
                    ArrowLeft={ArrowLeft} 
                    ArrowRight={ArrowRight} 
                />
            </div>

            {/* Tabela com os dados */}
            <div className="">
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
            </div>

        </RootLayout>
    );
}
