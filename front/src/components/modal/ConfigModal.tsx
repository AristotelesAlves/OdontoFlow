import InputWithLabel from "../common/Input";
import LayoutModal from "../layout/LayoutModal";
import {get, remover} from '../../util/userDateStoredLocally'
import { X } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

interface props {
    closeModal: () => void
}

export function ConfigModal(props: props){
    
    function editedUser(){

    }

    function newUser(){

    }

    const local = get()
    console.log(local)
      const router = useRouter();


    return (
        <LayoutModal>
            <div className="flex gap-1 bg-white relative">
                <button onClick={props.closeModal} className="absolute right-0 top-0">
                    <X size={25}/>
                </button>
                <nav className="p-2 flex flex-col justify-betweenp-2 bg-gray-50 border-r-2 ">
                    <ul className="flex flex-col items-start justify-start gap-2 h-full">
                        <li>
                            Informação
                        </li>
                        <li>
                            Segurança      
                        </li>
                        <li>
                            Categoria
                        </li>
                        <li>
                            Marcas
                        </li>
                    </ul>
                    <button onClick={() => {
                        remover()
                        router.push('/login');

                    }}>
                        Desconectar
                    </button>
                </nav>
                <div className="h-96 w-96">
                    <figure className="w-full p-1">
                        <img className="w-40 m-auto h-40 rounded-full" src="https://i.pinimg.com/564x/53/b1/e9/53b1e9e5a1f0cfb264b0d155c8b39b72.jpg" alt="" />
                    </figure>
                    <h1 className="w-full text-center font-semibold text-xl">
                        {local.name}
                    </h1>
                    <div className="flex flex-col">
                        <span>
                            Email:
                        </span>
                        <span>
                            {local.email}
                        </span>
                    </div>
                </div>
            </div>
        </LayoutModal>
    )
}