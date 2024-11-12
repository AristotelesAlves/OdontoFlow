import { moveInterface } from "../interface/moveInterface";

interface returnMove{
  id: number,
  usuario: string,
  destino: string,
  dt_movimentacao: Date,
  estorno: boolean,
  tipo: string,
}


export interface moveRepositoryInterface {
    create(data: Omit<moveInterface, 'id' | 'estorno'>): Promise<moveInterface | null>;
    getPaginatedMovements(page: number, pageSize: number): Promise<returnMove[]>;
    estornar(id: number): Promise<boolean>
  }