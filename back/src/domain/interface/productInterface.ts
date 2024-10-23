export interface productInterface {
    id: number
    nome: string            
    descricao: string           
    dt_validade: Date     
    unidade_medida: string  
    id_categoria?: number         
    id_marca?: number  
    id_usuario_atualizacao: number | null
    id_usuario_cadastro: number   
    status: boolean // essse aqui             
    em_uso: boolean   // esse aqui             
    dt_criacao: Date           
    dt_deletado: Date  | null     
    dt_atualizado: Date | null          
    id_clinica: number             
}