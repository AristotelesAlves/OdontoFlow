"use client"
import { Bell, Gear, MagnifyingGlass, SignOut, Stairs, Tooth, Trash, X } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { get, remover } from "../../util/userDateStoredLocally";
import apiService from "../../serive/apiService";

export default function Header(){

    const pathname = usePathname();
    const paginaAtual = pathname.split('/').pop()
    const [openBell, setOpenBell] = useState(false)
    const [notification, setNotification] = useState([])
    const [ponteiro, setPonteiro] = useState(false)
    const [user, setUser] = useState({
        id: 0,
        name:'',
        email: '',
        clinica_id: 0,
        token: '',
        adm: false
    })

    async function getUser(){
        const user = await get()
        if(user){
            setUser(user)
        }
        return
    }

    async function getNotification(){
        // notification
        const response = await apiService({
            endPoint: `notification?id=${get().id}`, 
            method: 'GET',
        });
        setNotification(response)
    }

    async function readNotification(id){
        if(id){
            const response = await apiService({
                endPoint: `notification?id=${id}`, 
                method: 'put',
            });
            setPonteiro(!ponteiro)
            return
        }
        setPonteiro(!ponteiro)
    }

    async function readNotificationAll(){
        for(let i = 0; i => notification.length; i++){
            const id_corrent = notification[i].id
            const response = await apiService({
                endPoint: `notification?id=${Number(id_corrent)}`, 
                method: 'put',
            });
        }
        setPonteiro(!ponteiro)
    }

    useEffect(() => {
        getUser()
        getNotification()
    },[ponteiro])

    function desconectar(){
        remover()
        window.location.reload();
    }

    return (
        <header className="flex w-full justify-between items-center pt-5">
            <div className="flex gap-4 items-center">
                <figure className="h-14 w-14 text-white flex items-center justify-center rounded-full bg-blue" >
                    <Tooth size={32} weight="fill"/>
                </figure>
                <nav>
                    <ul className="flex gap-2 items-center">
                        <li className={`py-2 px-4 rounded-3xl border-2 hover:bg-blue hover:bg-opacity-65 hover:text-white ${paginaAtual == 'dashboard' ? 'bg-blue text-white border-blue border-opacity-50' : null}`}>
                            <Link href="/dashboard">
                                Dashboard
                            </Link>
                        </li>
                        <li className={`py-2 px-4 rounded-3xl border-2 hover:bg-blue hover:bg-opacity-65 hover:text-white ${paginaAtual == 'historico' ? 'bg-blue text-white border-blue border-opacity-50' : null}`}>
                            <Link href="/historico">
                                Histórico
                            </Link>
                        </li>
                        <li className={`py-2 px-4 rounded-3xl border-2 hover:bg-blue hover:bg-opacity-65 hover:text-white ${paginaAtual == 'estoque' ? 'bg-blue text-white border-blue border-opacity-50' : null}`}>
                            <Link href="/estoque">
                                Estoque
                            </Link>
                        </li>
                        {
                            user.adm == true ? (
                                <li className={`py-2 px-4 rounded-3xl border-2 hover:bg-blue hover:bg-opacity-65 hover:text-white ${paginaAtual == 'usuarios' ? 'bg-blue text-white border-blue border-opacity-50' : null}`}>
                                    <Link href="/usuarios">
                                        Usuário
                                    </Link>
                                </li>

                            ) : null
                        }
                        <li className={`py-2 px-4 rounded-3xl border-2 hover:bg-blue hover:bg-opacity-65 hover:text-white ${paginaAtual == 'compras' ? 'bg-blue text-white border-blue border-opacity-50' : null}`}>
                            <Link href="/compras">
                                Compras
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex gap-4 items-center">
                
                <nav>
                    <ul className="flex gap-2 items-center">
                        <li className="relative w-fit h-fit">
                            {openBell && (
                                <div className="bg-gray-50 z-50 p-2  rounded-lg boder shadow-md absolute -left-52">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold">
                                            Últimas notificação
                                        </h3>
                                        <button onClick={() => setOpenBell(false)} className="p-2 rounded-md">
                                            <X size={20}/>
                                        </button>
                                    </div>
                                    <ul className="py-1">
                                        {
                                            notification.length <= 0 ? 'Nenhuma notificação' : null
                                        }
                                        {notification.map((nt, index) => {
                                            return (
                                                <li key={nt.id} className="border-y flex items-center pr-2">
                                                    <div>
                                                        <p className="font-semibold">
                                                            Estoque
                                                        </p>
                                                        <p className="text-sm">
                                                            {nt.mensagem}
                                                        </p>
                                                    </div>
                                                    <button onClick={() => readNotification(nt.id)} className="hover:text-red transition duration-75">
                                                        <Trash size={20}/>
                                                    </button>
                                                </li>
                                            )
                                        })}

                                    </ul>

                                    <button onClick={() => readNotificationAll()} className="py-1 border w-full rounded-md bg-blue text-white">
                                        Limpar notificações
                                    </button>
                                </div>
                            )}
                            <button onClick={() => setOpenBell(true)} className="w-14 h-14 flex items-center justify-center border rounded-full p-2 relative">
                                <Bell weight="fill" size={25}/>
                                <div className="w-5 h-5 flex items-center justify-center text-xs font-semibold text-white absolute right-0 top-0 bg-red rounded-full">
                                    <span>
                                        {notification.length}
                                    </span>
                                </div>
                            </button>
                        </li>
                        <li onClick={desconectar} className="w-14 h-14 cursor-pointer flex items-center justify-center border rounded-full p-2 relative">
                            <SignOut size={32} />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}