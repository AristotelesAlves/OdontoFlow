
import InputWithLabel from "../common/Input";
import LayoutModal from "../layout/LayoutModal";

export function CadastroProduto({onClose, type}){
    
    function editedUser(){

    }

    function newUser(){

    }

    return (
        <LayoutModal>
            <div className="flex gap-2 flex-col min-w-96">
                <h1 className="font-semibold py-1 ">
                    {
                        type === 'edit' ? 'Editar Produto' : 'Cadastro Produto'
                    }
                </h1>
                <InputWithLabel label={'Produto'} value={''} onChange={() => null} placeholder={''}/>
                <InputWithLabel label={'Marca'} value={''} onChange={() => null} placeholder={''}/>
                <InputWithLabel label={'Quantidade inícial'} value={''} onChange={() => null} placeholder={''}/>
                <InputWithLabel label={'Quantidade de compra'} value={''} onChange={() => null} placeholder={''}/>
                <InputWithLabel label={'Valor inícial'} value={''} onChange={() => null} placeholder={''}/>
                <div className=" flex gap-1 items-center ">
                    <button onClick={onClose} className="py-1 text-white  bg-zinc-opacity rounded-md w-full">
                        Cancelar
                    </button>
                    <button className="py-1  bg-blue text-white rounded-md w-full">
                        Cadastrar
                    </button>
                </div>
            </div>
        </LayoutModal>
    )
}