import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from '../utils/auth-jwt';

export default async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
    const token = request.headers['authorization'];

    if (!token) {
        return reply.status(401).send({ message: 'Token not provided' });
    }

    try {
        const verificationResult = verifyToken(token);

        if (!verificationResult) {
            return reply.status(401).send({ message: 'Invalid token' });
        }
    } catch (error) {
        console.error("Token verification error:", error);
        return reply.status(403).send({ message: 'Forbidden: Invalid token' });
    }
}
