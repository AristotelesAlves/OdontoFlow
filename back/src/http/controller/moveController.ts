import { FastifyReply, FastifyRequest } from "fastify";
import { moveRepositoryInterface } from "../../domain/repository/moveRepositoryInterface";
import { moveService } from "../../service/moveService";
import { newMoveZod } from "../../domain/schemaZoid/moveChemaZoid";
import { ZodError } from "zod";

export class moveConctroller{

    // constructor (
    //     private memory: moveRepositoryInterface
    // ){
    //     this.service = new moveService(this.service)
    // }

    async move(req: FastifyRequest, reply: FastifyReply){

        try {
            const data = newMoveZod.parse(req.body)
            reply.send(data)
        } catch (error) {
            console.error('Error creating product:', error);
            if (error instanceof ZodError) {
                reply.code(400).send({ message: "Validation error", issues: error.issues });
            } else {
                reply.code(500).send({ message: "Internal server error" });
            }
        }
    }
}