
import Jwt from 'jsonwebtoken';

export function userAuthVerifyToken(token) {
    try {
        return Jwt.verify(token, process.env.SECRET_KEY_JWT);
    } catch (error) {
        console.error("Token verification failed:", error);
        return null;
    }
}
