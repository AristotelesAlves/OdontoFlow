export interface moveInterface {
    id: number,
    type: 'uso' | 'saida' | 'entrada',
    userId: number,
    id_clinica : number,
    destino: string,
    dt_movimentacao: Date,  
    produto_movimentaao: {
        id: number,
        quantidade: number
    }[]
}