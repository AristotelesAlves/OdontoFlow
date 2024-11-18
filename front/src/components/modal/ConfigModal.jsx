import InputWithLabel from "../common/Input";
import LayoutModal from "../layout/LayoutModal";
import { get, remover } from '../../util/userDateStoredLocally';
import { X } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface Props {
    closeModal: () => void;
}

export function ConfigModal(props: Props) {
    // Funções para editar e criar um novo usuário, conforme necessário
    function editedUser() {
        // Implemente a lógica de edição de usuário aqui
    }

    function newUser() {
        // Implemente a lógica para criar um novo usuário aqui
    }

    // Obter dados do usuário armazenados localmente
    const local = get();
    console.log(local); // Apenas para depuração

    const router = useRouter();

    return (
        <LayoutModal>
            <div className="flex gap-1 bg-white relative">
                {/* Botão de Fechar Modal */}
                <button 
                    onClick={props.closeModal} 
                    className="absolute right-0 top-0 p-2"
                    aria-label="Fechar modal"
                >
                    <X size={25} />
                </button>

                {/* Navegação */}
                <nav className="p-4 flex flex-col justify-between bg-gray-50 border-r-2">
                    <ul className="flex flex-col items-start gap-2">
                        <li>Informações</li>
                        <li>Segurança</li>
                        <li>Categoria</li>
                        <li>Marcas</li>
                    </ul>

                    {/* Botão para Desconectar */}
                    <button
                        onClick={() => {
                            remover(); // Remover dados do usuário
                            router.push('/login'); // Redirecionar para a tela de login
                        }}
                        className="mt-4 text-red-500"
                    >
                        Desconectar
                    </button>
                </nav>

                {/* Informações do Usuário */}
                <div className="h-96 w-96 flex flex-col items-center justify-center">
                    {/* Foto do Usuário */}
                    <figure className="w-full p-1">
                        <img 
                            className="w-40 m-auto h-40 rounded-full" 
                            src="https://i.pinimg.com/564x/53/b1/e9/53b1e9e5a1f0cfb264b0d155c8b39b72.jpg" 
                            alt="Imagem do usuário"
                        />
                    </figure>

                    {/* Nome do Usuário */}
                    <h1 className="w-full text-center font-semibold text-xl mt-2">
                        {local.name}
                    </h1>

                    {/* Dados do Usuário (Email) */}
                    <div className="flex flex-col mt-2">
                        <span className="font-medium">Email:</span>
                        <span>{local.email}</span>
                    </div>
                </div>
            </div>
        </LayoutModal>
    );
}
