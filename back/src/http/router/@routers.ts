import { app } from "../../app";
import { moveRouter } from "./move-router";
import { productRouter } from "./produto-router";
import { userRouter } from "./user-router";

export async function routes(){
    app.register(userRouter)
    app.register(productRouter)
    app.register(moveRouter)

}