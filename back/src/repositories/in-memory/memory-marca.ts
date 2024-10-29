import { marcaInterface } from "../../domain/interface/marcaInterface";
import { marcaRepositoryInterface } from "../../domain/repository/marcaRepositoryInterface";


export class MarcaInMemory implements marcaRepositoryInterface {
    private marcas: marcaInterface[] = [
        { id: 1, nome: 'Marca A' },
        { id: 2, nome: 'Marca B' },
        { id: 3, nome: 'Marca C' },
        { id: 4, nome: 'Marca D' },
        { id: 5, nome: 'Marca E' }
    ];

    async save(data: Omit<marcaInterface, 'id'>): Promise<marcaInterface | null> {
        const id = this.marcas.length + 1;
        const newBrand = { ...data, id };
        this.marcas.push(newBrand);
        return newBrand;
    }

    async findById(id: number): Promise<marcaInterface> {
        const brand = this.marcas.find(m => m.id === id);
        if (!brand) throw new Error('Marca não encontrada');
        return brand;
    }
}
