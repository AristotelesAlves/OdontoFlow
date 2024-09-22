import { promises } from "dns";
import { env } from "../config/env";
import Jwt from 'jsonwebtoken'

export function generateToken(userId: number){
    const playLoad = {userId};
    const options = { expiresIn: '1h' };
    return Jwt.sign(playLoad, env.SECRET_KEY_JWT , options);
}

export function verifyToken(token: string) {
    try {
        return Jwt.verify(token, env.SECRET_KEY_JWT);
    } catch (error) {
        return null ;
    }
};

