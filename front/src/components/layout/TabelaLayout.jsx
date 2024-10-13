// components/Table.js
import { ArrowRight, ArrowsClockwise } from '@phosphor-icons/react';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

export default function TabelaLayout({ data = [] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No data available</div>;
  }

  const renderCell = (key, value, item) => {
    if (key.trim() === 'QTD_DO_PRODUTOS') {
      return (
        <div className="flex items-center gap-1">
          <div
            className={`bg-red-500 bg-opacity-30 rounded-md overflow-hidden w-full h-2 ${
              item.STATUS === 'entrada' ? 'bg-blue' : (item.STATUS === 'saida' || item.STATUS === 'em uso' ? 'bg-red' : 'transparent')
            }`}
          >
            <div
              className={`h-2 rounded-md overflow-hidden ${
                item.STATUS === 'entrada' ? 'bg-blue' : (item.STATUS === 'saida' || item.STATUS === 'em uso' ? 'bg-red' : 'transparent')
              }`}
              style={{ width: `${(value / item.estoque_progresso) * 100}%` }}
            ></div>
          </div>
          <p>{value}/{item.estoque_progresso}</p>
        </div>
      );
    }

    if (key.trim() === 'estoque_progresso') {
      return null;
    }

    if (key.trim() === 'STATUS') {
      const statusClasses = {
        entrada: 'blue',
        saida: 'red',
        'em uso': 'black',
      };

      return (
        <div className={`font-semibold flex items-center gap-2 text-${statusClasses[item.STATUS] || ''}`}>
          <div className={`p-1 bg-${statusClasses[item.STATUS]} rounded-full text-white bg-black`}>
            {
              item.STATUS === 'entrada' ? <ArrowRight /> :
              item.STATUS === 'saida' ? <ArrowLeft /> :
              item.STATUS === 'em uso' ? <ArrowsClockwise /> : null
            }
          </div>
          <span>{value}</span>
        </div>
      );
    }

    return value;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key} className="px-4 py-2 text-left text-gray-600">
                {key.trim() === 'QTD_DO_PRODUTOS' ? 'QT. PRODUTOS' : key.trim() === 'estoque_progresso' ? null : key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {Object.keys(item).map((key, i) => (
                <td key={i} className="px-4 py-2">
                  {renderCell(key, item[key], item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
