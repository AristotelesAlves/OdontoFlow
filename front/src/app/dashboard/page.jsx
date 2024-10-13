"use client"

import RootLayout from "../../components/layout/RootLayout";
import TabelaLayout from "../../components/layout/TabelaLayout";


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
            <div>
                <div className="w-fit px-8 py-5 rounded-2xl bg-blue text-white">
                    <h1 className="text-xl font-semibold">

                        Entradas e saídas
                    </h1>
                    <div className="py-2 flex gap-1 items-end">
                        <strong className="text-3xl">
                            22
                        </strong>
                        <span>
                            Entradas / Saídas hoje
                        </span>
                    </div>
                    <div className="flex w-full justify-between">
                        <div className=" flex flex-col items-center justify-center">
                            <strong>
                                10
                            </strong>
                            <span className="text-sm">
                                8h
                            </span>
                        </div>
                        <div className="border-l border-black"></div>
                        <div className=" flex flex-col items-center justify-center">
                            <strong>
                                10
                            </strong>
                            <span className="text-sm">
                                8h
                            </span>
                        </div>
                        <div className="border-l border-black"></div>
                        <div className="flex flex-col items-center justify-center">
                            <strong>
                                10
                            </strong>
                            <span className="text-sm">
                                8h
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <TabelaLayout data={data} />
        </RootLayout>
    )
}