"use client";
import Image from 'next/image';
import InputWithLabel from '../../components/common/Input';
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [error, setError] = useState({
        email: {
            status: false,
            message: ''
        },
        senha: {
            status: false,
            message: ''
        },
        notification: {
            status: false,
            message: ''
        },
    });

    const [user, setUser] = useState({
        email: '',
        senha: ''
    });

    async function handleSubmit(event) {
        event.preventDefault();
        router.push('/dashboard')
    }

    return (
        <section className="w-full h-screen flex justify-center bg-[#CDDBFF] items-center">
            <div className='bg-white shadow-md border border-white overflow-hidden rounded-3xl h-1/2 w-3/4 max-w-[1000px] flex'>
                <form className="px-6 pt-12 flex-1" onSubmit={handleSubmit}>
                    <div className='pb-2'>
                        <h1 className='text-5xl font-bold text-blue'>
                            Bem-vindo
                        </h1>
                        <p className='text-black'>
                            Entre na sua conta para acessar o sistema
                        </p>
                    </div>
                    <div className='flex flex-col gap-2 w-3/4'>
                        <InputWithLabel
                            error={error.email.status}
                            label={'Email'}
                            placeholder={'usuario@email.com'}
                            type='text'
                            value={user.email}
                            onChange={e => setUser({ ...user, email: e.target.value })}
                        />
                        <InputWithLabel
                            error={error.senha.status}
                            label={'Senha'}
                            placeholder={'Digite sua senha'}
                            type='password'
                            value={user.senha}
                            onChange={e => setUser({ ...user, senha: e.target.value })}
                        />
                        {error.notification.status && (
                            <p className="text-red-500">{error.notification.message}</p>
                        )}
                        <button className='bg-blue py-1 w-full text-white rounded-xl' type='submit'>
                            Entrar
                        </button>
                    </div>
                </form>
                <figure className="relative w-1/2 h-full">
                    <Image
                        src="/banner.png"
                        alt="Descrição da imagem"
                        className='rounded-3xl'
                        layout="fill" 
                        objectFit="cover" 
                    />
                </figure>
            </div>
        </section>
    );
}
