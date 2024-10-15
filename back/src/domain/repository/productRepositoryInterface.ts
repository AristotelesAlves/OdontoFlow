import { productInterface } from "../interface/productInterface"

export interface ProductRepositoryInterface {
    save(data:  Omit<productInterface, 'id' | 'dt_deletado' | 'dt_criacao' | 'dt_atualizado' | 'status' | 'em_uso'>): Promise<productInterface | null>;
    // findById(): Promise<productInterface>;
    // inactive(): Promise<boolean>
  }