import React from 'react';

const TabelaComBotoes = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key} className="px-4 py-2 text-left text-gray-600">
                {key}
              </th>
            ))}
            <th className="px-4 py-2 text-left text-gray-600">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {Object.values(item).map((value, i) => (
                <td key={i} className="px-4 py-2">
                  {value}
                </td>
              ))}
              <td className="px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">Editar</button>
                <button className="bg-yellow-500 text-white px-2 py-1 rounded">Visualizar</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaComBotoes;
