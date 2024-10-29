"use client"

import { Download, DownloadSimple, Plus, X } from "@phosphor-icons/react/dist/ssr";
import RootLayout from "../../components/layout/RootLayout";
import PdfListBuy from "../../components/modal/PdfListBuy";
import Table from "../../components/Table";
import { useState } from "react";


export default function page(){

    const data = [
        { PRODUTO: 'Seda Dental', Fornecedor: 'Aristoteles', QTD_DO_PRODUTOS: 150, valor: 20.23, CATEGORIA_DO_PRODUTO: 'Higiene Bucal' },
        { PRODUTO: 'Escovas de Dente', Fornecedor: 'Saúde Oral', QTD_DO_PRODUTOS: 200,valor: 20.23, CATEGORIA_DO_PRODUTO: 'Higiene Bucal' },
        { PRODUTO: 'Fio Dental', Fornecedor: 'Dental Care', QTD_DO_PRODUTOS: 100,valor: 20.23, CATEGORIA_DO_PRODUTO: 'Higiene Bucal' },
        { PRODUTO: 'Creme Dental', Fornecedor: 'Brilho Sorriso', QTD_DO_PRODUTOS: 80,valor: 20.23, CATEGORIA_DO_PRODUTO: 'Higiene Bucal' },
        { PRODUTO: 'Luva de Procedimento', Fornecedor: 'Higiene Total', QTD_DO_PRODUTOS: 500,valor: 20.23, CATEGORIA_DO_PRODUTO: 'Materiais de Proteção' },
        { PRODUTO: 'Máscara Cirúrgica', Fornecedor: 'Protec Saúde', QTD_DO_PRODUTOS: 300,valor: 20.23, CATEGORIA_DO_PRODUTO: 'Materiais de Proteção' },
        { PRODUTO: 'Gaze Estéril', Fornecedor: 'Cuidado Clínico', QTD_DO_PRODUTOS: 200,valor: 20.23, CATEGORIA_DO_PRODUTO: 'Materiais Clínicos' },
        { PRODUTO: 'Kit de Restauração', Fornecedor: 'Dentália', QTD_DO_PRODUTOS: 30,valor: 20.23, CATEGORIA_DO_PRODUTO: 'Materiais Odontológicos' }
    ];

    const [pdfModal, setPdfModal] = useState(false)
    const [newProductList, setNewProductList] = useState(false)
    const [editList, setEditList] = useState(false)
    
    return (
        <RootLayout>
            {pdfModal && (
                <PdfListBuy closeModal={() => setPdfModal(false)} data={data}/>
            )}
            <div className="flex items-center justify-between pt-4 pb-2">
                <h1 className="font-bold text-blue text-5xl">
                    Lista de compras
                </h1>
                <div className="flex gap-2 items-center">
                    <button onClick={() => setEditList(!editList)} className="flex gap-1 w-40 h-12 bg-black text-white rounded-[100px] items-center justify-center font-semibold">
                        {editList ? 'Cancelar' : 'Editar lista'}
                    </button>
                    {editList ? (
                        <button className="flex gap-1 w-40 h-12 bg-blue text-white rounded-[100px] items-center justify-center font-semibold">
                            Salvar
                        </button>
                    ) : (
                        <button onClick={() => setPdfModal(true)} className="flex gap-1 w-40 h-12 bg-blue text-white rounded-[100px] items-center justify-center font-semibold"> 
                            Extrair Lista
                            <DownloadSimple/>
                        </button>
                    )}
                </div>
            </div>
            
            <table className="w-full text-left">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left text-gray-600 text-base">
                            Produto
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 text-base">
                            Fornecedor
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 text-base">
                            Quantidade
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 text-base">
                            Marca
                        </th>
                        <th className="px-4 py-2 text-left text-gray-600 text-base">
                            Valor
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id || index} className={`cursor-pointer text-sm transition-colors py-2 ${index % 2 === 0 ? 'bg-[#E2E8F0]' : ''}`}>
                            <td className="px-4 py-2">
                                {
                                    editList && (
                                        <input className="w-10 " type="checkbox" name="" id="" />
                                    )
                                }
                                {item.PRODUTO}
                            </td>
                            <td className="px-4 py-2">
                                {item.Fornecedor}
                            </td>
                            <td className="px-4 py-2">
                                {item.QTD_DO_PRODUTOS} Unidades
                            </td>
                            <td className="px-4 py-2">
                                {item.CATEGORIA_DO_PRODUTO}
                            </td>
                            <td className="px-4 py-2">
                                R$ {item.valor.toString().replace('.',',')}
                            </td>
                        </tr>
                    ))}
                    {
                        newProductList && (
                            <tr className="bg-gray-300">
                                <td className="px-3 py-1">
                                    <input className="w-full rounded-md px-2 py-1 outline-none" placeholder="Nome do produto" type="text" />
                                </td>
                                <td className="px-3 py-1">
                                    <input className="w-full rounded-md px-2 py-1 outline-none" placeholder="Fornecedor" type="text" />
                                </td>
                                <td className="px-3 py-1">
                                    <input className="w-full rounded-md px-2 py-1 outline-none" placeholder="Quantidade" type="text" />
                                </td>
                                <td className="px-3 py-1">
                                    <input className="w-full rounded-md px-2 py-1 outline-none" placeholder="Marca" type="text" />
                                </td>
                                <td className="px-3 py-1">
                                    <input className="w-full rounded-md px-2 py-1 outline-none" placeholder="Valor" type="text" />
                                </td>
                                <td>
                                    <button>
                                        Adicionar
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            {editList && (
                <div className="flex gap-2 items-center">
                    <button onClick={() => setNewProductList(!newProductList)} className="w-[230px] h-[52px] rounded-md bg-blue bg-opacity-40 text-blue font-semibold">
                        {newProductList ? (
                            <div className="flex items-center justify-center gap-1">
                                <span className="p-1 rounded-full bg-blue text-blue">
                                    <X  className="text-sky-200 text-opacity-100"/>
                                </span>
                                <span>
                                    Cancelar
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-1">
                                <span className="p-1 rounded-full  bg-blue text-blue">
                                    <Plus className="text-sky-200 text-opacity-100"/>
                                </span>
                                <span>
                                    Adicionar intem na lista
                                </span>
                            </div>
                        ) }                
                    </button>
                    <button className="w-[278px] h-[52px] rounded-md flex bg-red bg-opacity-40 text-red font-semibold items-center justify-center gap-1">
                        <span className="p-1 rounded-full bg-red ">
                            <X  className="text-orange-200 text-opacity-60"/>
                        </span>
                        <span>
                            Remover itens selecionados
                        </span>
                    </button>
                </div>
            )}
            
        </RootLayout>
    )
}