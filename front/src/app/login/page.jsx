"use client";
import {save,get} from '../../util/userDateStoredLocally'
import InputWithLabel from '../../components/common/Input';
import Alert from '../../components/modal/Alert';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import apiService from '../../serive/apiService';

export default function Page() {

    useEffect(() => {
        const user = get();
        if (user && user.token) {
            router.push('/dashboard'); 
        } else {
            
        }
    }, []);

    const router = useRouter();
    const [popUpNotification, setPopUpNotification] = useState({
        status: false,
        message: ''
    });

    const [user, setUser] = useState({
        email: '',
        senha: ''
    });

    async function handleSubmit(event) {
        event.preventDefault();

        setPopUpNotification({
            status:false
        })

        try {
            const response = await apiService({
                endPoint:'login',
                body: user,
                method: 'POST'
            })
    
            if (response.message) {
                const message = {
                    'User not fund': 'Usuário não encontrado',
                    'Invalid password': 'Credenciais incorreta'
                }
                setPopUpNotification({
                    ...popUpNotification,
                    message: message[response.message] || 'Credenciais incorreta',
                    status: true
                });
                return;
            } 



            save({
                clinica_id: response.user.id_clinica,
                email: response.user.email,
                id: response.user.id,
                name: response.user.nome_usuario,
                token: response.token
            })

            router.push('/dashboard')
            
        } catch (error) {
            console.error(error)
        }
        
    }

    return (
        <section className="w-full h-screen flex justify-center bg-[#CDDBFF] items-center">
            {popUpNotification.status && (
                <Alert handleBtn={() => setPopUpNotification({...popUpNotification, message:'', status: false})} text={popUpNotification.message} error={true}/>
            )}
            <div className='bg-white shadow-md border border-white overflow-hidden rounded-3xl h-3/4 w-4/5 max-w-[1000px] flex'>
                <form className="px-6 pt-12 flex-1" onSubmit={handleSubmit}>
                    <div className='pb-2'>
                        <h1 className='text-6xl font-bold text-blue'>
                            Bem-vindo
                        </h1>
                        <p className='text-gray-800 pl-1 text-opacity-80'>
                            Entre na sua conta para acessar o sistema
                        </p>
                    </div>
                    <div className='flex flex-col gap-2 w-3/4'>
                        <InputWithLabel
                            label={'Email'}
                            placeholder={'usuario@email.com'}
                            type='email'
                            value={user.email}
                            onChange={e => setUser({ ...user, email: e.target.value })}
                        />
                        <InputWithLabel
                            label={'Senha'}
                            placeholder={'Digite sua senha'}
                            type='password'
                            value={user.senha}
                            onChange={e => setUser({ ...user, senha: e.target.value })}
                        />
                        <button className='bg-blue py-1 w-full text-white rounded-xl' type='submit'>
                            Entrar
                        </button>
                    </div>
                </form>
                <figure className="relative w-1/2 h-full">
                    <img
                        src="/banner.png"
                        alt="Descrição da imagem"
                        className='rounded-3xl h-full' 
                    />
                </figure>
            </div>
        </section>
    );
}
