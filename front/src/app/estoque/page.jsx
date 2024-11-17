"use client"
import RootLayout from "../../components/layout/RootLayout";
import { useReactToPrint } from "react-to-print";
import { useRef, useState } from "react";
import PagNavigation from "../../components/common/PagNavigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";




export default function Page() {

    const [pagProdutoUso, setPagProdutoUso] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1); 
    const [limit] = useState(10);

    return (
        <RootLayout>
            <h1 className="font-bold text-blue text-5xl">Histórico</h1>
            <div className="w-full flex items-center justify-between">
                <nav >
                    {pagProdutoUso ? (
                        <div className="flex gap-2 items-center">
                            <button onClick={() => setPagProdutoUso(false)} className="py-2 px-4 rounded-3xl text-white bg-red">
                                Voltar lista de produtos
                            </button>
                            <button className="py-2 px-4 rounded-3xl text-white bg-blue">
                                Adicionar produto em uso
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <button className="py-2 px-4 rounded-3xl text-white bg-blue">
                                Entrada de produto
                            </button>
                            <button onClick={() => setPagProdutoUso(true)} className="py-2 px-4 rounded-3xl text-white bg-gray-800">
                                Produto em uso
                            </button>
                            <button className="py-2 px-4 rounded-3xl text-white bg-red">
                                Saída de produto
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
                <div>

                </div>
            ): (
                <div>

                </div>
            )}
        </RootLayout>
    );
}
