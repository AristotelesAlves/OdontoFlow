import { randomUUID } from 'crypto';
import {UserRepository} from '../../domain/user/UserRepository'
import { userInterface } from '../../domain/user/userInterface';

const users: userInterface[]  = [
    {
        id: 1,
        nome_usuario: 'Aristóteles Alves',
        email: 'aristotelesalves39@gmail.com',
        cpf: '323132',
        status: true,
        senha: '$2b$10$Gj5xRjaSqcn5JJ/X1XQwbezbb11UgGrwti6eexX7VbqztzI6qv9b.', // eunaolembro
        dt_atualizado: new Date(),
        dt_deletado: null,
    },
    {
        id: 2,
        nome_usuario: 'João cabral',
        email: 'joaocabral@gmail.com',
        cpf: '90630263078',
        senha: '$2b$10$SpooMsbKR3gU.PfMVkj07.vQ/6dM1orwFojyTXS7JO.eluFvdlMKS', // algumacoisa
        status: false,
        dt_atualizado: new Date(),
        dt_deletado: null,
    },
]; 

export class UserInMemoryRepository implements UserRepository {
    
    async findAll(): Promise<userInterface[]> {
        return users;
    }
    
    async findByEmail (email: string): Promise<userInterface | null> {
        return users.find(user => user.email === email) || null;
    }   
    
    async findByCpf (cpf: string): Promise<userInterface | null>{
        return users.find(user => user.cpf === cpf) || null;
    }
    async save(userData: Omit<userInterface, 'id'>): Promise<userInterface> {

        const id = users.length
        const newUser = {...userData, id}
        users.push(newUser);
        return newUser;
    }
}





// import { userInterface } from "../../interface/user-interface";
// import { generateHash } from "../../utils/crypt";
// let hashedPassword = ''

// async () => {
//     hashedPassword = await generateHash('correctpassword'); // Hash a senha antes de salvar
// }

// const users: userInterface[]  = [
//     {
//         id: 1,
//         nome_usuario: 'Aristóteles Alves',
//         email: 'aristotelesalves39@gmail.com',
//         cpf: '90630263078',
//         status: true,
//         senha: '039390343503',
//         dt_atualizado: new Date(),
//         dt_deletado: null,
//     },
//     {
//         id: 2,
//         nome_usuario: 'João cabral',
//         email: 'joaocabral@gmail.com',
//         cpf: '90630263078',
//         senha: '2333',
//         status: true,
//         dt_atualizado: new Date(),
//         dt_deletado: null,
//     },

//     {
//         id: 8,
//         nome_usuario: 'Test User',
//         email: 'testuser@example.com',
//         cpf: '12345678900',
//         senha: hashedPassword, // Usar a senha hashada
//         status: true,
//         dt_atualizado: new Date(),
//         dt_deletado: null,
//     }
// ]; 

// export const userRepositoryMemory = {

    
    
//     findAll: async (): Promise<userInterface[]> => {
//         return users;
//     },


//     findById: async (id: number): Promise<userInterface | null> => {
//         return users.find(user => user.id === id) || null;
//     },


//     deleteById: async (id: number): Promise<boolean> => {
//         const index = users.findIndex(user => user.id === id);
//         if (index !== -1) {
//             users.splice(index, 1);
//             return true;
//         }
//         return false;
//     },
// };