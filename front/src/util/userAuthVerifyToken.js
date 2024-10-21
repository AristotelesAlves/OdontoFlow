import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

console.log('Process.env:', process.env); 
export async function userAuthVerifyToken(token) {

    const chave = await process.env.KEY_JWT // aqui ele ta retornando undifind, ele não consegue carrega minha variavel ambiente!!!
    console.log('KEY_JWT:', chave); 
    
    console.log('Process.env: ', process.env);
    try {
        const decoded = Jwt.verify(token, 'eu sou o batman');
        return decoded;
    } catch (error) {
        console.error("Token verification failed:", error);
        return null; 
    }
}
