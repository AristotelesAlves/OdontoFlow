import { app } from "../../app";
import listUser from "./list-user";

export async function userRouter(){
    app.register(listUser)
    
}