import { app } from "../../app";
import listUser from "./list-user";
import loginUser from "./login-user";
import registerUser from "./register-user";

export async function userRouter(){
    app.register(listUser)
    app.register(loginUser)    
    app.register(registerUser)    

}