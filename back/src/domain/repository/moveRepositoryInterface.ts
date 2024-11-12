import { moveInterface } from "../interface/moveInterface";

export interface moveRepositoryInterface {
    create(data: Omit<moveInterface, 'id' | 'estorno'>): Promise<moveInterface | null>;
    getPaginatedMovements(page: number, pageSize: number): Promise<moveInterface[]>;
    estornar(id: number): Promise<boolean>
  }