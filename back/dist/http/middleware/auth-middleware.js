"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authMiddleware;
const auth_jwt_1 = require("../../utils/auth-jwt");
async function authMiddleware(request, reply) {
    const token = request.headers['authorization'];
    if (!token) {
        return reply.status(401).send({ message: 'Token not provided' });
    }
    try {
        const verificationResult = (0, auth_jwt_1.verifyToken)(token);
        if (!verificationResult) {
            return reply.status(401).send({ message: 'Invalid token' });
        }
        console.log(verificationResult);
    }
    catch (error) {
        console.error("Token verification error:", error);
        return reply.status(403).send({ message: 'Forbidden: Invalid token' });
    }
}
