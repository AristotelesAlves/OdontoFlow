"use client"
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Header(){

    const pathname = usePathname();
    const currentPage = pathname.split('/').pop()

    return (
        <header className="flex w-full justify-between items-center pt-2">
            <div className="flex gap-4 items-center">
                <figure>
                    <img className="h-12 w-12 rounded-full bg-blue" src="" alt=""/>
                </figure>
                <nav>
                    <ul className="flex gap-2 items-center">
                        <li className={`py-2 px-4 rounded-3xl border-2 ${currentPage == 'dashboard' ? 'bg-blue text-white border-blue border-opacity-50' : null}`}>
                            <Link href="/dashboard">
                                Dashboard
                            </Link>
                        </li>
                        <li className={`py-2 px-4 rounded-3xl border-2 ${currentPage == 'historico' ? 'bg-blue text-white border-blue border-opacity-50' : null}`}>
                            <Link href="/historico">
                                Histórico
                            </Link>
                        </li>
                        <li className={`py-2 px-4 rounded-3xl border-2 ${currentPage == 'estoque' ? 'bg-blue text-white border-blue border-opacity-50' : null}`}>
                            <Link href="/estoque">
                                Estoque
                            </Link>
                        </li>
                        <li className={`py-2 px-4 rounded-3xl border-2 ${currentPage == 'usuarios' ? 'bg-blue text-white border-blue border-opacity-50' : null}`}>
                            <Link href="/usuarios">
                                Usuário
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex gap-4 items-center">
                <span>
                    input
                </span>
                <nav>
                    <ul className="flex gap-2 items-center">
                        <li>config</li>
                        <li>bell</li>
                        <li>user</li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}