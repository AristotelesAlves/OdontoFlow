import { prisma } from "../../config/prisma/inex";
import { userInterface } from "../../interface/user-interface";

interface Iuser {

}

export const userRepository = {

  findAll: async (): Promise<userInterface[] | null> =>  {
    return await prisma.usuario.findMany() ;
  },

  save: async (userData: userInterface): Promise<userInterface> => {
    return await prisma.usuario.create({ data: userData});
  },


};

