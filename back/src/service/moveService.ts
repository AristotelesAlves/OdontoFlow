import { moveRepositoryInterface } from "../domain/repository/moveRepositoryInterface";

export class moveService{
    constructor(
        private moveRepository: moveRepositoryInterface
    ){}


    async move(){
        return null
    } 

    async reversal(){
        return {
            message: 'Helo world'
        }
    }
}