import { userInterface } from '../../domain/interface/userInterface';
import { UserRepositoryInterface } from '../../domain/repository/UserRepositoryInterface';

export class UserInMemoryRepository implements UserRepositoryInterface {
    private users: userInterface[] = [
        {
            id: 1,
            nome_usuario: 'Aristóteles Alves',
            email: 'aristotelesalves39@gmail.com',
            cpf: '323132',
            status: true,
            senha: '$2b$10$Gj5xRjaSqcn5JJ/X1XQwbezbb11UgGrwti6eexX7VbqztzI6qv9b.', // eunaolembro
            dt_atualizado: new Date(),
            id_clinica: 1,
            dt_deletado: null,
        },
        {
            id: 2,
            id_clinica: 1,
            nome_usuario: 'João Cabral',
            email: 'joaocabral@gmail.com',
            cpf: '90630263078',
            senha: '$2b$10$SpooMsbKR3gU.PfMVkj07.vQ/6dM1orwFojyTXS7JO.eluFvdlMKS', // algumacoisa
            status: false,
            dt_atualizado: new Date(),
            dt_deletado: null,
        },
    ];

    async findAll(): Promise<Omit<userInterface, 'senha'>[]> {
        return this.users.map(({ senha, ...user }) => user);
    }

    async findByEmail(email: string): Promise<userInterface | null> {
        return this.users.find(user => user.email === email) || null;
    }

    async findByCpf(cpf: string): Promise<userInterface | null> {
        return this.users.find(user => user.cpf === cpf) || null;
    }

    async save(userData: Omit<userInterface, 'id'>): Promise<userInterface> {
        const newId = this.users.length > 0 ? Math.max(...this.users.map(user => user.id)) + 1 : 1;
        const newUser: userInterface = {
            id: newId,
            ...userData,
            dt_atualizado: new Date(),
            dt_deletado: null
        };
        this.users.push(newUser);
        return newUser;
    }
}
