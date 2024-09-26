import { UserController } from "../controller/userController"

export async function userRouter(){
    new UserController().login()
    new UserController().register()
}