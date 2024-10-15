import { categoriaInterface } from "../../domain/interface/categoriaInterface";
import { categoriaRepositoryInterface } from "../../domain/repository/categoriaRepositoryInterface";

export class CategoriaInMemory implements categoriaRepositoryInterface {
    private categorias: categoriaInterface[] = [
        { id: 1, nome: 'Higiene Bucal' },
        { id: 2, nome: 'Limpeza' },
        { id: 3, nome: 'Cuidados Dentários' },
        { id: 4, nome: 'Proteção' }
    ];

    async save(data: Omit<categoriaInterface, 'id'>): Promise<categoriaInterface | null> {
        const id = this.categorias.length + 1;
        const newCategory = { ...data, id };
        this.categorias.push(newCategory);
        return newCategory;
    }

    async findById(id: number): Promise<categoriaInterface> {
        const category = this.categorias.find(cat => cat.id === id);
        if (!category) throw new Error('Categoria não encontrada');
        return category;
    }
}
