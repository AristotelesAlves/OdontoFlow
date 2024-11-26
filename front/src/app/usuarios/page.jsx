"use client"
import RootLayout from "../../components/layout/RootLayout";
import Table from "../../components/Table";
import PagNavigation from "../../components/common/PagNavigation";
import { useState, useEffect } from "react";
import { UserModal } from "../../components/modal/UserModal";
import apiService from "../../serive/apiService";
import { DotsThree, Pencil, Trash } from "@phosphor-icons/react/dist/ssr";
import { get } from "../../util/userDateStoredLocally";

export default function Page() {
    const [data, setData] = useState([]);
    const [activeMenu, setActiveMenu] = useState(null); 
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState('create');  // Estado para determinar se é criar ou editar
    const [selectedUser, setSelectedUser] = useState({
        nome_usuario:'',
        email:'', 
        cpf:'', 
        senha: '', 
        adm: false, 
        status: false
    });  // Usuário selecionado para editar
    const [ponteiro, setPonteiro] = useState(false)
    // Função para pegar a lista de usuários
    async function getUsers() {
        const service = await apiService({ endPoint: 'users', method: 'GET' });
        console.log(service)
        if (service) {
            setData(service);
        }
    }

    useEffect(() => {
        getUsers();
    }, [ponteiro, modal]);

    // Abrir o modal de edição com os dados do usuário
    function openEditModal(user) {
        setSelectedUser(user);
        console.log(user)
        setModalType('edit');
        setModal(true);
    }

    function openCreateModal() {
        setModalType('');
        setModal(true);
    }



    // Abrir o modal de cadastro
    async function active(id, status) {
        const service = await apiService({
            endPoint: `user?id=${id}&status=${!status}`,
            method: 'put'
        })
        setPonteiro(!ponteiro)
        console.group(service)
    }

    if(get().adm == false){
        return (
            <div className="flex flex-col w-full justify-center items-center gap-1 h-screen">
                <h1 className="font-bold text-4xl text-blue">Você não tem autorização</h1>
                <a className="p-2 rounded-lg text-white bg-black" href="/">Voltar ao inicio</a>
            </div>
        )
    }else {
        return (
            <RootLayout>
                {modal && (
                    <UserModal
                        onClose={() => setModal(false)}
                        type={modalType}
                        user={selectedUser}
                    />
                )}
    
                <div className="flex w-full justify-between">
                    <div className="flex flex-col gap-5 pt-2">
                        <h1 className="font-bold text-blue text-5xl">Usuários Cadastrados</h1>
                        <button onClick={openCreateModal} className="py-2 px-10 rounded-[100px] font-semibold bg-blue text-white w-fit">
                            Cadastrar Usuário
                        </button>
                    </div>
                    <PagNavigation />
                </div>
    
    
    
                {data.length > 0 ? (
                    <table className="min-w-full w-full overflow-y-scroll">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-start ">Usuário</th>
                                <th className="px-4 py-2 text-start ">Email</th>
                                <th className="px-4 py-2 text-start ">CPF</th>
                                <th className="px-4 py-2 text-start ">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user, index) => {
                                if(user.dt_deletado != null){
                                    return
                                }
                                return (
                                    <tr key={user.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                        <td className="px-4 py-2 text-start">{user.nome_usuario}</td>
                                        <td className="px-4 py-2 text-start">{user.email}</td>
                                        <td className="px-4 py-2 text-start">{user.cpf}</td>
                                        <td className="px-4 py-2 text-start">
                                            {user.status ? (
                                                <div className="flex gap-1 items-center">
                                                    <div className="rounded-full w-5 h-5 bg-green-500">
                                                    
                                                    </div>
                                                    <p className="text-green-400">
                                                        Ativado
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="flex gap-1 items-center">
                                                    <div className="rounded-full w-5 h-5 bg-red">
                                                        
                                                    </div>
                                                    <p className="text-red">
                                                        Desativado
                                                    </p>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-2  flex gap-1 items-center ">
                                            <button onClick={() => openEditModal(user)}>
                                                <Pencil size={25} />
                                            </button>
                                            {/* <Trash size={25} /> */}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                ) : (
                    'Nenhum usuário encontrado'
                )}
            </RootLayout>
        );
    }
}
