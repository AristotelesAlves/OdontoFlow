"use client"

import { Tooth, X } from "@phosphor-icons/react/dist/ssr";
import LayoutModal from "../layout/LayoutModal";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

export default function PdfListBuy({ data = [], closeModal }){

    function getDate() {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    return (
        <LayoutModal>
            <div className="relative">
                <button onClick={closeModal} className="absolute top-4 right-4 rounded-md hover:bg-gray-50 active:bg-gray-100">
                    <X size={25}/>
                </button>
                <div ref={contentRef} className="p-4">
                    <div className="flex flex-col items-center justify-center w-full">
                        <div className="flex items-center">
                            <Tooth size={25} weight="fill" />
                            <span className="font-semibold">Odonto Flow</span>
                        </div>
                        <h1 className="text-4xl font-semibold">Lista de compra</h1>
                        <span>{getDate()}</span>
                    </div>

                    <table className="w-full mt-4 border-collapse">
                        <thead>
                            <tr className="text-left">
                                {/* <th className="py-2"></th> */} 
                                <th className="py-2">Produto</th>
                                <th className="py-2">Fornecedor</th>
                                <th className="py-2">Quantidade</th>
                                <th className="py-2">Categoria</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className="border-b">
                                    {/* <td className="p-2"><Square size={30}/></td> */}
                                    <td className="p-2">{item.PRODUTO}</td>
                                    <td className="p-2">{item.Fornecedor}</td>
                                    <td className="p-2">{item.QTD_DO_PRODUTOS} unidades</td>
                                    <td className="p-2">{item.CATEGORIA_DO_PRODUTO}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button className="w-full rounded-md p-2 bg-blue text-white font-semibold" onClick={reactToPrintFn}>
                    Imprimir
                </button>
            </div>
        </LayoutModal>
    )
}