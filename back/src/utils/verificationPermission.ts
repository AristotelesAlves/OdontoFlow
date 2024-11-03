// import { FastifyReply, FastifyRequest } from "fastify";
// import { UserProfileRepositoryInterface } from "../domain/userProfile/userProfileRepositoryInterface";

// export async function verifyUserPermission(req: FastifyRequest, reply: FastifyReply, memoryProfile: UserProfileRepositoryInterface) {
//     const idUser = Number(req.headers['id_user']);
    
//     if (!idUser) {
//         return reply.status(400).send({ message: 'id user request not found' });
//     }

//     const permission = await memoryProfile.findById(idUser);
//     if (!permission?.lista_usuario) {
//         return reply.status(403).send({ message: 'user not authorized' });
//     }

//     return true; // Se tudo estiver ok, retorna true
// }