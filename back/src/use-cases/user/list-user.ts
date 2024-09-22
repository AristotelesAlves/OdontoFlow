import { FastifyRequest, FastifyInstance, FastifyReply } from "fastify";
import authMiddleware from "../../middleware/auth-middleware";

export default async function listUser(app: FastifyInstance){
    app.get('/users', { preHandler: authMiddleware }, (req: FastifyRequest, reply: FastifyReply) => {
        return reply.status(200).send([
            {
                id: 1,
                user: 'carlos'
            },
            {
                id: 2,
                user: 'fernando'
            },
            {
                id: 3,
                user: 'joao'
            }
        ])
    }
    )
}