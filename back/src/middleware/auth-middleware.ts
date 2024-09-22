import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from '../utils/auth';


export default async function authMiddleware(request: FastifyRequest, reply: FastifyReply){
    const token = request.headers['authorization'];

    if(!token){
        return reply.status(401).send({message: 'you not have token on requisition'})
    }

    const verificationResult = verifyToken(token);

    if (verificationResult instanceof Error) {
        return reply.status(401).send({'Token is invalid': verificationResult.message});
    }

}