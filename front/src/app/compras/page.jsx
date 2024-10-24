"use client"

import { Download, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import RootLayout from "../../components/layout/RootLayout";
import PdfListBuy from "../../components/modal/PdfListBuy";
import Table from "../../components/Table";
import { useState } from "react";


export default function page(){

    const data = [
        { PRODUTO: 'Seda Dental', Fornecedor: 'Aristoteles', QTD_DO_PRODUTOS: 150, CATEGORIA_DO_PRODUTO: 'Higiene Bucal' },
        { PRODUTO: 'Escovas de Dente', Fornecedor: 'Saúde Oral', QTD_DO_PRODUTOS: 200, CATEGORIA_DO_PRODUTO: 'Higiene Bucal' },
        { PRODUTO: 'Fio Dental', Fornecedor: 'Dental Care', QTD_DO_PRODUTOS: 100, CATEGORIA_DO_PRODUTO: 'Higiene Bucal' },
        { PRODUTO: 'Creme Dental', Fornecedor: 'Brilho Sorriso', QTD_DO_PRODUTOS: 80, CATEGORIA_DO_PRODUTO: 'Higiene Bucal' },
        { PRODUTO: 'Luva de Procedimento', Fornecedor: 'Higiene Total', QTD_DO_PRODUTOS: 500, CATEGORIA_DO_PRODUTO: 'Materiais de Proteção' },
        { PRODUTO: 'Máscara Cirúrgica', Fornecedor: 'Protec Saúde', QTD_DO_PRODUTOS: 300, CATEGORIA_DO_PRODUTO: 'Materiais de Proteção' },
        { PRODUTO: 'Gaze Estéril', Fornecedor: 'Cuidado Clínico', QTD_DO_PRODUTOS: 200, CATEGORIA_DO_PRODUTO: 'Materiais Clínicos' },
        { PRODUTO: 'Kit de Restauração', Fornecedor: 'Dentália', QTD_DO_PRODUTOS: 30, CATEGORIA_DO_PRODUTO: 'Materiais Odontológicos' }
    ];

    const [pdfModal, setPdfModal] = useState(false)
    
    return (
        <RootLayout>
            {pdfModal && (
                <PdfListBuy closeModal={() => setPdfModal(false)} data={data}/>
            )}
            <div className="flex items-center justify-between pt-4 pb-2">
                <h1 className="font-bold text-blue text-5xl">
                    Lista de compras
                </h1>
                <button onClick={() => setPdfModal(true)} className="flex gap-1 w-40 h-12 bg-blue text-white rounded-[100px] items-center justify-center font-semibold"> 
                    Extrair Lista
                    <DownloadSimple/>
                </button>
            </div>
            
            <div className="overflow-auto">
                <Table data={data} type={'lista compras'} acao={true}/>
            </div>
            
        </RootLayout>
    )
}