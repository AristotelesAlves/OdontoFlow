import { FastifyReply, FastifyRequest } from "fastify";
import { moveRepositoryInterface } from "../../domain/repository/moveRepositoryInterface";
import { moveService } from "../../service/moveService";
import { newMoveZod } from "../../domain/schemaZoid/moveChemaZoid";

export class moveConctroller{

    // constructor (
    //     private memory: moveRepositoryInterface
    // ){
    //     this.service = new moveService(this.service)
    // }

    async move(req: FastifyRequest, reply: FastifyReply){
        const data = newMoveZod.parse(req.body)
        reply.send(data)
    }
}