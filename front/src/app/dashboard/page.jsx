"use client"

import { ArrowsLeftRight, FirstAid } from "@phosphor-icons/react/dist/ssr";
import RootLayout from "../../components/layout/RootLayout";
import Table from "../../components/Table";


export default function page(){

    const data = [
        { PRODUTO: 'Seda Dental', usuário: 'Aristoteles', QTD_DO_PRODUTOS: 150,estoque_progresso: 200, DETALHE: 'Entrada, 10/09/2024', STATUS: 'entrada' },
        { PRODUTO: 'Luvas Descartáveis', usuário: 'Pierre', QTD_DO_PRODUTOS: 200,estoque_progresso: 200, DETALHE: 'Saída, 12/09/2024', STATUS: 'saida' },
        { PRODUTO: 'Máscaras Cirúrgicas', usuário: 'Diva', QTD_DO_PRODUTOS: 100, estoque_progresso: 35, DETALHE: 'Uso, 15/09/2024', STATUS: 'em uso' },
        { PRODUTO: 'Anestésico Local', usuário: 'Olavo', QTD_DO_PRODUTOS: 50, estoque_progresso: 76, DETALHE: 'Entrada, 18/09/2024', STATUS: 'entrada' },
        { PRODUTO: 'Raspador Dental', usuário: 'Aristoteles', QTD_DO_PRODUTOS: 30, estoque_progresso: 40, DETALHE: 'Saída, 20/09/2024', STATUS: 'saida' },
        { PRODUTO: 'Flúor Gel', usuário: 'Diva', QTD_DO_PRODUTOS: 75, estoque_progresso: 140, DETALHE: 'Uso, 25/09/2024', STATUS: 'em uso' },
      ];
      

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
            <Table data={data} />
        </RootLayout>
    )
}