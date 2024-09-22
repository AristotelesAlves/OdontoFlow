import { userInterface } from "../../interface/user-interface";

const users: userInterface[] = []; 

const userRepository = {
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

    deleteById: async (id: number): Promise<boolean> => {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users.splice(index, 1);
            return true;
        }
        return false;
    },
};