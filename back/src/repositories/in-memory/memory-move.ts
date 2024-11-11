import { moveInterface } from "../../domain/interface/moveInterface";
import { moveRepositoryInterface } from "../../domain/repository/moveRepositoryInterface";

export class moveMemory implements moveRepositoryInterface {
    private move: moveInterface[] = [
        {
            id: 1,
            destino: 'sei lá',
            dt_movimentacao: new Date(),
            id_clinica: 1,
            type: 'entrada',
            userId: 1,
            produto_movimentaao: [
                {
                    id: 1,
                    quantidade: 10
                },
                {
                    id: 2,
                    quantidade: 10
                },
            ],
            
        }
    ]

    async create(data: Omit<moveInterface, 'id'>): Promise<moveInterface | null> {
        const id = this.move.length + 1;
        const newMove = {...data, id}
        this.move.push(newMove)
        if(this.move.length === id){
            return this.move
        }
        return null
    }
}

