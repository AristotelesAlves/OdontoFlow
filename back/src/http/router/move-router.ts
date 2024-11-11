
import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../../app";
import { moveConctroller } from "../controller/moveController";


const controller = new moveConctroller();

export async function moveRouter() {
    app.post('/move', (req: FastifyRequest, reply: FastifyReply) => controller.move(req, reply));
   
}


