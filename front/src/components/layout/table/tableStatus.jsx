import React from 'react';

const TabelaComStatus = ({ data }) => {
  const renderStatusIcon = (status) => {
    switch (status) {
      case 'ativo':
        return <span className="text-green-500">✅</span>;
      case 'inativo':
        return <span className="text-yellow-500">⚠️</span>;
      case 'bloqueado':
        return <span className="text-red-500">❌</span>;
      default:
        return null;
    }
  };

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
            <th className="px-4 py-2 text-left text-gray-600">Status</th>
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
                {renderStatusIcon(item.status)} {/* Supondo que a propriedade status exista */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaComStatus;
