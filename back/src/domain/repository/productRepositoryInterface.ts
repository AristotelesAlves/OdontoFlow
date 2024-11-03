import { productInterface } from "../interface/productInterface";

export interface ProductRepositoryInterface {
    save(data: Omit<productInterface, 'id' | 'dt_deletado' | 'dt_criacao' | 'dt_atualizado' | 'status' | 'id_usuario_atualizacao' | 'id_marca' | 'id_categoria'> & {
        nome_categoria: string;
        nome_marca: string;
        qt_estoque: number;
        qt_compra: number;
        qt_minima: number;
    }): Promise<productInterface | null>;

    findAll(page: number, limit: number): Promise<{ produtos: productInterface[], total: number }>;

    findById(id: number): Promise<productInterface | null>;

    update(id: number, data: Partial<Omit<productInterface, 'id' | 'dt_deletado' | 'dt_criacao' | 'dt_atualizado'>>): Promise<productInterface | null>;

    delete(id: number): Promise<boolean>;
}