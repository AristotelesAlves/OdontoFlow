import { app } from "./app";
import { userRouter } from "./use-cases/user/@user-router";

export async function routes(){
    app.register(userRouter)
}