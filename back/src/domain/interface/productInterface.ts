export interface productInterface {
    id: number
    nome: string            
    descricao: string           
    data_validade: Date     
    unidade_medida: string 
    fornecedor: string 
    id_categoria?: number
    preco: number         
    id_marca?: number  
    id_usuario_atualizacao: number | null
    id_usuario_cadastro: number   
    status: boolean          
    dt_criacao: Date           
    dt_deletado: Date  | null     
    dt_atualizado: Date | null          
    id_clinica: number             
}