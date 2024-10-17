import { useState, useCallback } from 'react';
import { ArrowRight, ArrowsClockwise, ArrowLeft, DotsThree, Check, X } from '@phosphor-icons/react';
import { UserModal } from './modal/UserModal';

export default function Table({ data = [], acao = false, type }) {
    const [dropDownIndex, setDropDownIndex] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedUser(null);
    }, []);

    const openUserModal = useCallback((item) => {
        setSelectedUser(item);
        setIsModalOpen(true);
    }, []);

    function renderStatusIcon(status){
        const icons = {
            entrada: <ArrowRight />,
            saida: <ArrowLeft />,
            'em uso': <ArrowsClockwise />,
            ativo: <Check />,
            desativado: <X />,
        };
        return icons[status] || null;
    };

    function renderTextColor(param){
        const color = {
            'entrada': 'text-blue',
            'ativo': 'text-blue',
            'em uso': 'text-[#000000]',
            'saida':'text-red',
            'desativado':'text-red',
        }
        return color[param] || null
    }

    function renderBackgroundColor(param){
        const color = {
            'entrada': 'bg-blue',
            'ativo': 'bg-blue',
            'em uso': 'bg-[#000000]',
            'saida':'bg-red',
            'desativado':'bg-red',
        }
        return color[param] || null
    }

    function renderCell(key, value, item, index){
        
        const status = (item.STATUS?.toLowerCase() ?? '');

        if (key.trim() === 'STATUS') {
            return (
                <div className='flex gap-2 items-center font-semibold'>
                    <div className={`${renderBackgroundColor(status)} p-1 rounded-full text-white`}>
                        {renderStatusIcon(item.STATUS.toLowerCase())}
                    </div>
                    <p className={`${renderTextColor(status)}`}>
                        {value}
                    </p>
                </div>
            );
        }

        if (key.trim() === 'QTD_DO_PRODUTOS') {
            if(type !== 'lista compras'){
                const percentage = (value / item.estoque_progresso) * 100;
                return (
                    <div className="flex items-center gap-2">
                        <div className={`bg-red-500 bg-opacity-30 rounded-md overflow-hidden w-full h-2 ${renderBackgroundColor(status)}`}>
                            <div className={`h-2 rounded-md overflow-hidden  ${renderBackgroundColor(status)}`} style={{ width: `${percentage}%` }}></div>
                        </div>
                        <p className='w-16'> 
                            {value}/{item.estoque_progresso}
                        </p>
                    </div>
                )

            }

            return value
        }

        if (key.trim() === 'estoque_progresso') return null;

        if (key.trim() === 'STATUS') {
        }

        if (acao && key === 'acao') {
            return renderActionCell(item, index);
        }

        return value;
    };

    function renderActionCell(item, index){
        return (
            <div className='relative'>
                <button 
                    className='font-bold p-1 rounded-full hover:bg-stone-950 hover:bg-opacity-20' 
                    onClick={() => setDropDownIndex(dropDownIndex === index ? false : index)}
                >
                    <DotsThree size={20} />
                </button>
                {dropDownIndex === index && (
                    <ul className='flex flex-col p-2 rounded-md border absolute bg-white h-fit z-40 shadow-md left-2 gap-1'>
                        <li className='hover:bg-zinc p-2 rounded-md'>
                            <button onClick={() => {
                                openUserModal(item);
                                setDropDownIndex(false); 
                            }}>
                                Editar
                            </button>
                        </li>
                        <li className='hover:bg-zinc p-2 rounded-md'>
                            <button>
                                {type === 'user' ? (item.STATUS === 'Ativo' ? 'Desativar' : 'Ativar') : null}
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        );
    };

    return (
        <div>
            {isModalOpen && selectedUser && (
                <UserModal 
                    type={'edit'} 
                    nome={selectedUser.Nome} 
                    email={selectedUser.Email} 
                    cpf={selectedUser.CPF} 
                    onClose={closeModal} 
                />
            )}
            <table className="min-w-full">
                <thead>
                    <tr>
                        {data.length > 0 && Object.keys(data[0]).map((key) => (
                            <th key={key} className="px-4 py-2 text-left text-gray-600 text-base">
                                {key.toUpperCase().replace(/_/g, ' ')}
                            </th>
                        ))}
                        {acao && <th className="text-gray-600 pr-5">AÇÃO</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id || index} className={`cursor-pointer text-sm transition-colors py-2 ${index % 2 === 0 ? 'bg-[#E2E8F0]' : ''}`}>
                            {Object.keys(item).map((key, i) => (
                                <td key={key} className="px-4 py-2">
                                    {renderCell(key, item[key], item, index)}
                                </td>
                            ))}
                            {acao && <td className="text-center pr-5">{renderCell('acao', null, item, index)}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
