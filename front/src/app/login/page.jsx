import Image from 'next/image';
import InputWithLabel from '../../components/common/Input';

export default function Page() {
    return (
        <section className="w-full h-screen flex justify-center bg-[#CDDBFF] items-center">
            <div className='bg-white overflow-hidden rounded-2xl h-1/2 w-3/4 max-w-[1000px]  flex '>
                <form className="px-6 pt-12 flex-1">
                    <div className='pb-2'>
                        <h1 className='text-5xl font-bold text-blue'>
                            Bem-vindo
                        </h1>
                        <p className='text-black'>
                            Entre na sua conta para acessar o sistema
                        </p>
                    </div>
                    <div className='flex flex-col gap-2 w-3/4'>
                        <InputWithLabel label={'Email'} placeholder={'usuario@email.com'} type='text' />
                        <InputWithLabel label={'Senha'} placeholder={'Digite sua senha'} type='password' />
                        <button className='bg-blue py-1 w-full text-white rounded-xl' type='submit'>
                            Entrar
                        </button>
                    </div>
                </form>
                <figure className="relative w-1/2 h-full relative">
                    <Image
                        src={'https://i.pinimg.com/enabled/564x/dd/78/ba/dd78bac58c989968fbe27f3878c5631f.jpg'}
                        alt="Descrição da imagem"
                        className='rounded-xl'
                        layout="fill" 
                        objectFit="cover" 
                    />
                </figure>
            </div>
        </section>
    );
}
