import { userRepositoryMemory } from "../../repository/in-memory/memory-user";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { generateToken } from "../../utils/auth-jwt";
import { verifyHash } from "../../utils/crypt";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(16)
})

export default async function loginUser(app: FastifyInstance) {
    app.post('/login', async (req: FastifyRequest, reply: FastifyReply) => {
        try {
            const { email, password } = loginSchema.parse(req.body);

            const usuario = await userRepositoryMemory.findByEmail(email);

            if (!usuario) {
                return reply.status(404).send('User not found');
            }

            if (! await verifyHash(password, usuario.senha)) {
                return reply.status(401).send('Invalid password');
            }

            const {senha, ...userWithoutPassword} = usuario

            if (usuario.id !== undefined) {
                const token = generateToken(usuario.id);
            
                return reply.status(200).send({
                    data: userWithoutPassword,
                    token: token
                });
            } else {
                return reply.status(500).send({ message: "User ID is undefined" });
            }
    
        } catch (error) {
            if (error instanceof z.ZodError) {
                return reply.status(400).send({
                    message: "Invalid request body for login",
                    errors: error.errors
                });
            }

            console.error("Error fetching login of user", error);
            return reply.status(500).send({ message: "Internal Server Error" });
        }
    });
}
