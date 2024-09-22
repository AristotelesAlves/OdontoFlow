import { userInterface } from "../../interface/user-interface";


const users: userInterface[]  = [
    {
        id: 1,
        nome_usuario: 'Aristóteles Alves',
        email: 'aristotelesalves39@gmail.com',
        cpf: '90630263078',
        status: true,
        senha: '039390343503',
        dt_atualizado: new Date(),
        dt_deletado: null,
    },
    {
        id: 2,
        nome_usuario: 'João cabral',
        email: 'joaocabral@gmail.com',
        cpf: '90630263078',
        senha: '2333',
        status: true,
        dt_atualizado: new Date(),
        dt_deletado: null,
    }
]; 

export const userRepositoryMemory = {
    
    findAll: async (): Promise<userInterface[]> => {
        return users;
    },

    save: async (userData: userInterface): Promise<userInterface | null> => {
        users.push(userData);
        return userData;
    },

    findById: async (id: number): Promise<userInterface | null> => {
        return users.find(user => user.id === id) || null;
    },

    findByEmail: async (email: string): Promise<userInterface | null> => {
        return users.find(user => user.email === email) || null;
    },

    findByCpf: async (cpf: string): Promise<userInterface | null> => {
        return users.find(user => user.cpf === cpf) || null;
    },

    deleteById: async (id: number): Promise<boolean> => {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users.splice(index, 1);
            return true;
        }
        return false;
    },
};