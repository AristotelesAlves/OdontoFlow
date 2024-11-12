export interface moveInterface {
    id: number,
    tipo: string,
    id_usuario: number,
    estorno: boolean,
    id_clinica : number,
    destino: string,
    dt_movimentacao: Date,  
    produto_movimentaao: {
        id: number,
        quantidade: number
    }[]
}