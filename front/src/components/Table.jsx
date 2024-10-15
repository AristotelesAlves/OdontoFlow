import { useState } from 'react';
import { ArrowRight, ArrowsClockwise, ArrowLeft, DotsThree } from '@phosphor-icons/react';
import { UserModal } from './modal/UserModal';

export default function Table({ data = [], acao = false, type }) {
    const [dropDownIndex, setDropDownIndex] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    function closeModal() {
        setIsModalOpen(false);
        setSelectedUser(null);
    }

    function openUserModal(item) {
      setSelectedUser(item);
      setIsModalOpen(true);
    }

    function renderCell(key, value, item, index) {
        if (key.trim() === 'QTD_DO_PRODUTOS') {
            const percentage = (value / item.estoque_progresso) * 100;
            const bgColor = item.STATUS === 'entrada' ? 'bg-blue' : (item.STATUS === 'saida' || item.STATUS === 'em uso' ? 'bg-red' : 'transparent');

            return (
                <div className="flex items-center gap-1">
                    <div className={`bg-red-500 bg-opacity-30 rounded-md overflow-hidden w-full h-2 ${bgColor}`}>
                        <div className={`h-2 rounded-md overflow-hidden ${bgColor}`} style={{ width: `${percentage}%` }}></div>
                    </div>
                    <p>{value}/{item.estoque_progresso}</p>
                </div>
            );
        }

        if (key.trim() === 'estoque_progresso') return null;

        if (key.trim() === 'STATUS') {
            const statusClasses = {
                entrada: 'blue',
                saida: 'red',
                'em uso': 'black',
                Ativo: 'green-500',
                Desativado: 'red',
            };

            return (
                <div className={`flex justify-start items-start w-full font-semibold gap-2 text-${statusClasses[item.STATUS] || ''}`}>
                    {item.STATUS !== 'Desativado' && item.STATUS !== 'Ativo' && (
                        <div className={`p-1 bg-${statusClasses[item.STATUS]} rounded-full text-white`}>
                            {renderStatusIcon(item.STATUS)}
                        </div>
                    )}
                    <p>{value}</p>
                </div>
            );
        }

        if (acao && key === 'acao') {
            return renderActionCell(item, index);
        }

        return value;
    }

    function renderStatusIcon(status) {
        switch (status) {
            case 'entrada':
                return <ArrowRight />;
            case 'saida':
                return <ArrowLeft />;
            case 'em uso':
                return <ArrowsClockwise />;
            default:
                return null;
        }
    }

    function renderActionCell(item, index) {
        return (
            <div className='relative'>
                <button onClick={() => setDropDownIndex(dropDownIndex === index ? false : index)}>
                    <DotsThree />
                </button>
                {dropDownIndex === index && (
                    <ul className='flex flex-col p-2 rounded-md bg-white absolute h-fit z-40 shadow-md -left-10 gap-1'>
                        <li className='hover:bg-zinc p-2 rounded-md'>
                            <button onClick={() => {
                                openUserModal(item);
                                setDropDownIndex(false); 
                            }}>
                                Editar
                            </button>
                        </li>
                        {type === 'user' ? (
                          <li className='hover:bg-zinc p-2 rounded-md'>
                              <button>{item.STATUS === 'Ativo' ? 'Desativar' : 'Ativar'}</button>
                          </li>
                        ) : (
                          <li className='hover:bg-zinc p-2 rounded-md'>
                              <button>Estornar</button>
                          </li>
                        )}
                    </ul>
                )}
            </div>
        );
    }

    return (
        <div>
            {isModalOpen && selectedUser && (
                <UserModal type={'edit'} 
                    nome={selectedUser.Nome} 
                    email={selectedUser.Email} 
                    cpf={selectedUser.CPF} 
                    onClose={closeModal} 
                />
            )}
            <table className="min-w-full">
                <thead>
                    <tr>
                        {Object.keys(data[0]).map((key) => (
                            <th key={key} className="px-4 py-2 text-left text-gray-600">
                                {key.trim() === 'QTD_DO_PRODUTOS' ? 'QT. PRODUTOS' : key.trim() === 'estoque_progresso' ? null : key}
                            </th>
                        ))}
                        {acao && <th className="px-4 py-2 text-left text-gray-600">Ação</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            {Object.keys(item).map((key, i) => (
                                <td key={i} className="px-4 py-2">
                                    {renderCell(key, item[key], item, index)}
                                </td>
                            ))}
                            {acao && <td className="px-4 py-2">{renderCell('acao', null, item, index)}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
