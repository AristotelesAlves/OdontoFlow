import { useState, useEffect } from "react";
import InputWithLabel from "../common/Input";
import LayoutModal from "../layout/LayoutModal";
import apiService from "../../serive/apiService";

export function UserModal({ type, onClose, user }) {
    
    const [formData, setFormData] = useState({
        adm: false,
        cpf: '',
        email: '',
        senha: '',
        status: false,
        nome_usuario: '',
        id: null, // Ou undefined, dependendo da lógica
    });
    
    // Atualize o estado quando o modal abrir
    useEffect(() => {
        if (type == 'edit') {
            setFormData(user);
        }
    }, [user]);

    // Função para editar ou cadastrar o usuário
    async function handleSubmit() {
        console.log("Dados enviados:", formData); // Adicione este log
        try {
            if (type === "edit") {
                await apiService({
                    endPoint: `user/update`,
                    method: "put",
                    body: {
                        adm: formData.adm,
                        cpf: formData.cpf,
                        email: formData.email,
                        status: formData.status,
                        senha: formData.senha,
                        nome_usuario: formData.nome_usuario,
                        id: formData.id,
                    },
                });
            } else {
                await apiService({
                    endPoint: "register",
                    method: "post",
                    body: {
                        adm: formData.adm,
                        cpf: formData.cpf,
                        email: formData.email,
                        senha: formData.senha,
                        nome: formData.nome_usuario,
                    },
                });
            }
            onClose();
        } catch (error) {
            console.error("Erro ao salvar os dados:", error);
            alert("Erro ao salvar os dados.");
        }
    }

    return (
        <LayoutModal>
            <div className="flex gap-2 flex-col min-w-96 w-full">
                <h1 className="font-semibold py-1">
                    {type === "edit" ? "Editar Usuário" : "Cadastrar Usuário"}
                </h1>
                <InputWithLabel
                    label="Nome do Usuário"
                    value={formData.nome_usuario}
                    onChange={(e) =>
                        setFormData({ ...formData, nome_usuario: e.target.value })
                    }
                    name="nome_usuario"
                />
                <InputWithLabel
                    label="Email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    name="email"
                />
                <InputWithLabel
                    label="CPF"
                    value={formData.cpf}
                    onChange={(e) =>
                        setFormData({ ...formData, cpf: e.target.value })
                    }
                    name="cpf"
                />
                <p className="text-sm">CPF deve conter 12 caracteres</p>
                <InputWithLabel
                    label="Senha"
                    value={formData.senha}
                    onChange={(e) =>
                        setFormData({ ...formData, senha: e.target.value })
                    }
                    name="senha"
                    type="password"
                />
                <p className="text-sm">Senha deve conter 8 caracteres</p>

                <div className="flex gap-2 items-center">
                    <h3>Permissão ADM:</h3>
                    <div
                        onClick={() =>
                            setFormData({ ...formData, adm: !formData.adm })
                        }
                        className={`w-14 rounded-lg border cursor-pointer border-black p-1 flex ${
                            formData.adm ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`w-5 h-5 ${
                                formData.adm ? "bg-green-300" : "bg-red"
                            } rounded-md`}
                        ></div>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <h3>Status:</h3>
                    <div
                        onClick={() =>
                            setFormData({ ...formData, status: !formData.status })
                        }
                        className={`w-14 rounded-lg border cursor-pointer border-black p-1 flex ${
                            formData.status ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`w-5 h-5 ${
                                formData.status ? "bg-green-300" : "bg-red"
                            } rounded-md`}
                        ></div>
                    </div>
                </div>

                <div className="flex gap-1 items-center">
                    <button
                        onClick={onClose}
                        className="py-1 bg-zinc-opacity text-white rounded-md w-full"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="py-1 bg-blue text-white rounded-md w-full"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </LayoutModal>
    );
}
