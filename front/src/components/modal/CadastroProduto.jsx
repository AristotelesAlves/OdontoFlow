import { useState, useEffect } from "react";
import apiService from "../../serive/apiService";
import InputWithLabel from "../common/Input";
import LayoutModal from "../layout/LayoutModal";
import { get } from "../../util/userDateStoredLocally";

export default function ProdutoModal({ onClose, type, id }) {
    
    async function loadingProduct(){
        const service = await apiService({
            endPoint: `product?id=${Number(id)}`, 
            method: 'GET',
        })  

        return service
    }


    useEffect(() => {
        if (type == 'edit') {
            const fetchData = async () => {
                try {
                    const data = await loadingProduct(); // Aguarda a Promise
                    console.log(data);
    
                    const estoque = data.estoques[0] || {};
    
                    setFormData((prev) => ({
                        ...prev,
                        nome: data.nome,
                        data_validade: data.data_validade.split("T")[0], // Formato "YYYY-MM-DD"
                        descricao: data.descricao,
                        fornecedor: data.fornecedor,
                        nome_categoria: data.categoria?.nome || "", // Categoria pode ser opcional
                        nome_marca: data.marca?.nome || "", // Marca pode ser opcional
                        preco: data.preco || 0,
                        qt_estoque: estoque.estoque || 0,
                        qt_minima: estoque.quantidade_minima || 0,
                        id_usuario_atualizacao: 1,
                        id_categoria: data.id_categoria,
                        id_marca: data.id_marca,
                        id_estoque: data.estoques[0].id

                    }));
                } catch (error) {
                    console.error("Erro ao carregar o produto:", error);
                }
            };
    
            fetchData();
        }
    }, [type]);

    const dateStored = get();

    const [formData, setFormData] = useState({
        nome: "",
        preco: 0,
        qt_compra: 0,
        id_estoque: 0,
        id_marca: 0,
        id_categoria: 0,
        descricao: "",
        data_validade: "",
        fornecedor: "",
        qt_estoque: 0,
        qt_minima: 0,
        unidade_medida: "un",
        nome_categoria: "",
        nome_marca: "",
        id_usuario_atualizacao: 1,
        id_usuario_cadastro:1,
        id_clinica: 1,
    });


    // Função de envio de dados (criação ou atualização)
    async function handleSubmit() {
        
        
        try {
            const response = await  apiService({
                endPoint: type === 'edit'? `product?id=${Number(id)}` : 'product',
                method: type === "edit" ? "put" : "post",
                body: formData
            })
            console.log(response);
            onClose();
        } catch (error) {
            console.error("Erro ao salvar o produto:", error);
        }
    }

    return (
        <LayoutModal>
            <div className="flex gap-2 flex-col min-w-96 h-[450px]">
                <h1 className="font-semibold py-1">
                    {type === "edit" ? "Editar Produto" : "Cadastro de Produto"}
                </h1>
                <div className="h-full flex-1 overflow-y-scroll py-2">
                    <InputWithLabel
                        label="Produto"
                        name="nome"
                        value={formData.nome}
                        onChange={(e) => setFormData({...formData, nome: e.target.value})}
                        placeholder="Nome do produto"
                    />
                    <InputWithLabel
                        label="Marca"
                        name="nome_marca"
                        value={formData.nome_marca}
                        onChange={(e) => setFormData({...formData, nome_marca: e.target.value})}
                        placeholder="Nome da marca"
                    />
                    <InputWithLabel
                        label="Categoria"
                        name="nome_categoria"
                        value={formData.nome_categoria}
                        onChange={(e) => setFormData({...formData, nome_categoria: e.target.value})}
                        placeholder="Nome da categoria"
                    />
                    <InputWithLabel
                        label="Quantidade inicial"
                        name="qt_estoque"
                        type="number"
                        value={formData.qt_estoque}
                        onChange={(e) => setFormData({...formData, qt_estoque: Number(e.target.value)})}
                        placeholder="0"
                    />
                    <InputWithLabel
                        label="Estoque mínimo"
                        name="qt_minima"
                        type="number"
                        value={formData.qt_minima}
                        onChange={(e) => setFormData({...formData, qt_minima: Number(e.target.value)})}
                        placeholder="0"
                    />
                    <InputWithLabel
                        label="Quantidade de compra"
                        name="qt_compra"
                        type="number"
                        value={formData.qt_compra}
                        onChange={(e) => setFormData({...formData, qt_compra: Number(e.target.value)})}
                        placeholder="0"
                    />
                    <InputWithLabel
                        label="Valor inicial"
                        name="preco"
                        type="number"
                        value={formData.preco}
                        onChange={(e) => setFormData({...formData, preco: Number(e.target.value) })}
                        placeholder="0.00"
                    />
                    <InputWithLabel
                        label="Descrição"
                        name="descricao"
                        value={formData.descricao}
                        onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                        placeholder="Descrição do produto"
                    />
                    <InputWithLabel
                        label="Fornecedor"
                        name="fornecedor"
                        value={formData.fornecedor}
                        onChange={(e) => setFormData({...formData, fornecedor: e.target.value})}
                        placeholder="Nome do fornecedor"
                    />
                    <InputWithLabel
                        label="Data de validade"
                        name="data_validade"
                        type="date"
                        value={formData.data_validade}
                        onChange={(e) => setFormData({...formData, data_validade: e.target.value})}
                    />
                </div>
                <div className="flex gap-1 items-center">
                    <button
                        onClick={onClose}
                        className="py-1 text-white bg-zinc-opacity rounded-md w-full"
                    >
                        Cancelar
                    </button>
                    <button 
                        onClick={handleSubmit}
                        className="py-1 bg-blue text-white rounded-md w-full"
                    >
                        {type === "edit" ? "Salvar Alterações" : "Cadastrar"}
                    </button>
                </div>
            </div>
        </LayoutModal>
    );
}
