import { app } from "./app";
import { userRouter } from "./http/router/@user-router";


export async function routes(){
    app.register(userRouter)
}