"use client"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
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
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-blue text-3xl">
                    Histórico
                </h1>
                <ul className="flex gap-1 items-center">
                    <li>
                        <button className="p-1 rounded-full border w-8 h-8 flex items-center justify-center">
                            <ArrowLeft/>
                        </button>
                    </li>
                    <li>
                        <button className="p-1 rounded-full border w-8 h-8 flex items-center justify-center bg-blue text-white">
                            1
                        </button>
                    </li>
                    <li>
                        <button className="p-1 rounded-full border w-8 h-8 flex items-center justify-center">
                            2
                        </button>
                    </li>
                    <li>
                        <button className="p-1 rounded-full border w-8 h-8 flex items-center justify-center">
                            3
                        </button>
                    </li>
                    <li>
                        <button className="p-1 rounded-full border w-8 h-8 flex items-center justify-center">
                            4
                        </button>
                    </li>
                    <li>
                        <button className="p-1 rounded-full border w-8 h-8 flex items-center justify-center">
                            <ArrowRight/>
                        </button>
                    </li>
                </ul>
            </div>
            <TabelaLayout data={data} />
        </RootLayout>
    )
}