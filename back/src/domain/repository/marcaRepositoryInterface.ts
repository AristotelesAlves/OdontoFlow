import { categoriaInterface } from "../interface/categoriaInterface";

export interface marcaRepositoryInterface {
    save(data:  Omit<categoriaInterface, 'id'>): Promise<categoriaInterface | null>;
    findById(id:number): Promise<categoriaInterface>;
  }