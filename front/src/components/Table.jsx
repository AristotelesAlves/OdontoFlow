import { useState } from 'react';
import { ArrowRight, ArrowsClockwise, ArrowLeft, DotsThree, Check, X } from '@phosphor-icons/react';
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
    
    function renderStatusIcon(status) {
        switch (status) {
            case 'entrada':
                return <ArrowRight />;
                case 'saida':
                    return <ArrowLeft />;
                    case 'em uso':
                        return <ArrowsClockwise />;
                        case 'ativo':
                            return <Check />;
                            case 'desativado':
                                return <X />;
            default:
                return null;
            }
        }
        
        function renderCell(key, value, item, index) {
            
            const status = item.STATUS.toLowerCase()
            
            const colorBg = (status === 'entrada' || status === 'ativo' || status === 'em uso') ? 'bg-blue' :
            (status === 'saida' || status === 'desativado') ? 'bg-red' :
            'bg-black';
            
            const colorText = (status === 'entrada' || status === 'ativo') ? 'text-blue' :
            (status === 'saida' || status === 'desativado') ? 'text-red' :
            'text-black';

            if (key.trim() === 'QTD_DO_PRODUTOS') {
                
                const percentage = (value / item.estoque_progresso) * 100;
            return (
                <div className="flex items-center gap-1">
                    <div className={`bg-red-500 bg-opacity-30 rounded-md overflow-hidden w-full h-2 ${colorBg}`}>
                        <div className={`h-2 rounded-md overflow-hidden ${colorBg}`} style={{ width: `${percentage}%` }}></div>
                    </div>
                    <p>{value}/{item.estoque_progresso}</p>
                </div>
            );
        }

        if (key.trim() === 'estoque_progresso') return null;

        if (key.trim() === 'STATUS') {
            return (
                <div className='flex gap-2 items-center font-semibold'>
                    <div className={`${colorBg} p-1 rounded-full text-white`}>
                        {renderStatusIcon(status)}
                    </div>
                    <p className={`${colorText}`}>
                        {value}
                    </p>
                </div>
            );
        }

        if (acao && key === 'acao') {
            return renderActionCell(item, index);
        }

        return value;
    }


    function renderActionCell(item, index) {
        return (
            <div className='relative'>
                <button className='font-bold p-1 rounded-full hover:bg-stone-950 hover:bg-opacity-20' onClick={() => setDropDownIndex(dropDownIndex === index ? false : index)}>
                    <DotsThree size={20}/>
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
                        {type === 'user' ? (
                          <li className='hover:bg-zinc p-2 rounded-md '>
                              <button>{item.STATUS === 'Ativo' ? 'Desativar' : 'Ativar'}</button>
                          </li>
                        ) : (
                          <li className='hover:bg-zinc p-2 rounded-md '>
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
                            <th key={key} className="px-4 py-2 text-left text-gray-600 text-base">
                                {key.trim() === 'QTD_DO_PRODUTOS' ? 'QT. PRODUTOS' : key.trim() === 'estoque_progresso' ? null : key.toUpperCase()}
                            </th>
                        ))}
                        {acao && <th className="text-gray-600 pr-5">AÇÃO</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className={`cursor-pointer text-sm  transition-colors ${index % 2 === 0 ? 'bg-[#E2E8F0] ' : null}`}>
                            {Object.keys(item).map((key, i) => (
                                <td key={i} className="px-4 py-2">
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
