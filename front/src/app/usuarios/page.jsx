"use client"

import RootLayout from "../../components/layout/RootLayout";
import Table from "../../components/Table";
import PagNavigation from "../../components/common/PagNavigation";
import { useState } from "react";
import { UserModal } from "../../components/modal/UserModal";



export default function page(){

    const data = [
        { Nome: 'ADM', CPF: '000.000.000-00', Email: 'email@gmail.com', STATUS: 'Ativo' },
        { Nome: 'Usuário pereira', CPF: '000.000.000-00', Email: 'email@gmail.com', STATUS: 'Ativo' },
        { Nome: 'Usuário algum', CPF: '000.000.000-00', Email: 'email@gmail.com', STATUS: 'Desativado' },
      ];
    
    const [modal, setModal] = useState(false)

    return (
        <RootLayout>
            {modal && (
                <UserModal onClose={() => setModal(false)}/>
            )}
            <div className="flex w-full justify-between">
                <div className="flex flex-col gap-5 pt-2">
                    <h1 className="font-bold text-blue text-5xl">
                        Usuários Cadastrados
                    </h1>
                    <button onClick={() => setModal(true)} className="py-2 px-10 rounded-[100px] font-semibold bg-blue text-white w-fit">
                        Cadastrar Usuário
                    </button>
                </div>
                <PagNavigation/>
            </div>
            <Table data={data} acao={true} type={'user'}/>
        </RootLayout>
    )
}