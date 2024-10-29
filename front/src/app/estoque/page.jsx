"use client";
import RootLayout from "../../components/layout/RootLayout";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import Link from "next/link";

const Estoque = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const data = [
    { produto: "Nome do Produto", marca: "Marca do Produto", quantidade: 0, total: 10, fornecedor: "Fornecedor do Produto" },
    { produto: "Nome do Produto", marca: "Marca do Produto", quantidade: 1, total: 10, fornecedor: "Fornecedor do Produto" },
    { produto: "Nome do Produto", marca: "Marca do Produto", quantidade: 8, total: 10, fornecedor: "Fornecedor do Produto" },
    { produto: "Nome do Produto", marca: "Marca do Produto", quantidade: 4, total: 10, fornecedor: "Fornecedor do Produto" },
    { produto: "Nome do Produto", marca: "Marca do Produto", quantidade: 1, total: 10, fornecedor: "Fornecedor do Produto" },
    { produto: "Nome do Produto", marca: "Marca do Produto", quantidade: 4, total: 10, fornecedor: "Fornecedor do Produto" },
    { produto: "Nome do Produto", marca: "Marca do Produto", quantidade: 1, total: 10, fornecedor: "Fornecedor do Produto" },
    { produto: "Nome do Produto", marca: "Marca do Produto", quantidade: 8, total: 10, fornecedor: "Fornecedor do Produto" },
    { produto: "Nome do Produto", marca: "Marca do Produto", quantidade: 4, total: 10, fornecedor: "Fornecedor do Produto" },
    { produto: "Nome do Produto", marca: "Marca do Produto", quantidade: 1, total: 10, fornecedor: "Fornecedor do Produto" },
    { produto: "Nome do Produto", marca: "Marca do Produto", quantidade: 4, total: 10, fornecedor: "Fornecedor do Produto" },
    { produto: "Nome do Produto", marca: "Marca do Produto", quantidade: 1, total: 10, fornecedor: "Fornecedor do Produto" },
  ];

  return (
    <RootLayout>
      <div ref={componentRef} className="w-full bg-white text-gray-800 font-sans overflow-hidden">
        {/* Botões para outras páginas */}
        <div className="flex gap-4 px-8 pt-8 items-center">
          <Link href="/entrada-produto">
            <button className="px-6 py-2 rounded-full bg-blue-500 text-white font-semibold">
              Entrada de Produto
            </button>
          </Link>
          <Link href="/produto-em-uso">
            <button className="px-6 py-2 rounded-full bg-gray-800 text-white font-semibold">
              Produto em Uso
            </button>
          </Link>
          <Link href="/saida-produto">
            <button className="px-6 py-2 rounded-full bg-red-500 text-white font-semibold">
              Saída de Produto
            </button>
          </Link>
        </div>

        {/* Título */}
        <h1 className="text-4xl font-semibold text-blue-600 mt-4 px-8">Estoque de Produtos</h1>

        {/* Tabela de Produtos com Barra de Rolagem */}
        <div className="mt-6 overflow-y-auto max-h-96 px-8">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-6 py-3 text-sm font-medium text-gray-500">PRODUTO</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">MARCA</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">QTD DO PRODUTO</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">FORNECEDOR</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-500">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-4 text-gray-700">{item.produto}</td>
                  <td className="px-6 py-4 text-gray-700">{item.marca}</td>
                  <td className="px-6 py-4 flex items-center gap-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.quantidade <= 4 ? "bg-red-500" : "bg-blue-500"}`}
                        style={{ width: `${(item.quantidade / item.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className={`${item.quantidade <= 4 ? "text-red-500" : "text-blue-500"}`}>
                      {item.quantidade}/{item.total}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{item.fornecedor}</td>
                  <td className="px-6 py-4 text-gray-700">•••</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação e Botão de Impressão */}
        <div className="flex items-center justify-between px-8 py-4 mt-6">
          <span className="text-gray-700">Páginas:</span>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-500">
              &lt;
            </button>
            {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
              <button
                key={index}
                className={`w-8 h-8 flex items-center justify-center border ${
                  page === 1 ? "bg-blue-500 text-white" : "border-gray-300 text-gray-700"
                } rounded-full`}
              >
                {page}
              </button>
            ))}
            <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-500">
              &gt;
            </button>
          </div>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            Imprimir Estoque
          </button>
        </div>
      </div>
    </RootLayout>
  );
};

export default Estoque;
