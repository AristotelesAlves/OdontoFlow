import InputWithLabel from "../common/Input";
import LayoutModal from "../layout/LayoutModal";

export function UserModal({nome, email, cpf, onClose, type}){
    
    function editedUser(){

    }

    function newUser(){

    }

    return (
        <LayoutModal>
            <div className="flex gap-2 flex-col min-w-96">
                <h1 className="font-semibold py-1 ">
                    {
                        type === 'edit' ? 'Editar Usuário' : 'Cadastrar Usuário'
                    }
                </h1>
                <InputWithLabel label={'Nome'} value={nome}/>
                <InputWithLabel label={'Email'} value={email}/>
                <InputWithLabel label={'CPF'} value={cpf}/>
                <InputWithLabel label={'Senha'} type="password"/>
                <div className=" flex gap-1 items-center ">
                    <button onClick={onClose} className="py-1  bg-zinc rounded-md w-full">
                        Cancelar
                    </button>
                    <button className="py-1  bg-blue text-white rounded-md w-full">
                        Salvar
                    </button>
                </div>
            </div>
        </LayoutModal>
    )
}