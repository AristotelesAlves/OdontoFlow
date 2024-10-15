"use client"
import { Bell, Gear, MagnifyingGlass, Tooth } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Header(){

    const pathname = usePathname();
    const paginaAtual = pathname.split('/').pop()

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
                        <li className={`py-2 px-4 rounded-3xl border-2 hover:bg-blue hover:bg-opacity-65 hover:text-white ${paginaAtual == 'usuarios' ? 'bg-blue text-white border-blue border-opacity-50' : null}`}>
                            <Link href="/usuarios">
                                Usuário
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex gap-4 items-center">
                <div className="flex gap-1 items-center border rounded-3xl h-14 px-2">
                    <MagnifyingGlass size={25}/>
                    <input type="text" placeholder="Buscando por algo?" className=" border-none outline-none w-[200px]" name="" id="" />
                </div>
                
                <nav>
                    <ul className="flex gap-2 items-center">
                        <li className="w-14 h-14 flex items-center justify-center border rounded-full p-2 relative">
                            <Gear size={25}/>
                        </li>
                        <li className="w-14 h-14 flex items-center justify-center border rounded-full p-2 relative">
                            <Bell weight="fill" size={25}/>
                            <div className="w-5 h-5 flex items-center justify-center text-xs font-semibold text-white absolute right-0 top-0 bg-red rounded-full">
                                <span>
                                    1
                                </span>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}