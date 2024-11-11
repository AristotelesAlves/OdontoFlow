import { moveInterface } from "../interface/moveInterface";

export interface moveRepositoryInterface {
    create(data: Omit<moveInterface, 'id'>): Promise<moveInterface | null>;
    reversal(id:number): Promise<{
        message: string,
    }>;
  }