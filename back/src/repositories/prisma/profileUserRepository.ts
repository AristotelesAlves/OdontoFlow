import { prisma } from "../../config/prisma";
import { userProfileInterface } from "../../domain/userProfile/userProfileInterface";
import { UserProfileRepositoryInterface } from "../../domain/userProfile/userProfileRepositoryInterface";

export class ProfileUserRepository implements UserProfileRepositoryInterface{
    async create(profile: userProfileInterface): Promise<userProfileInterface | null>{
        const create = await prisma.perfilUsuario.create({
            data:
                profile
        })

        if(!create){
            return null
        }

        return create
    }

    
}