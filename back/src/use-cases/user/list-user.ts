import { FastifyRequest, FastifyInstance, FastifyReply } from "fastify";
import { userRepositoryMemory } from "../../repository/in-memory/memory-user";
import authMiddleware from "../../middleware/auth-middleware";

export default async function listUser(app: FastifyInstance){
    app.get('/users', { preHandler: authMiddleware }, async (req: FastifyRequest, reply: FastifyReply)  => {
        try {
            const result = await userRepositoryMemory.findAll();

            if (result.length === 0) {
                return reply.status(204).send();
            }

            return reply.status(200).send(result);
        } catch (error) {
            console.error("Error fetching users:", error);
            return reply.status(500).send({ message: "Internal Server Error" });
        }
    });
}