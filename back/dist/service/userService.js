"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const auth_jwt_1 = require("../utils/auth-jwt");
const crypt_1 = require("../utils/crypt");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async login(email, password) {
        try {
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                return {
                    statusCode: 404, // classico, não encontrado
                    message: 'User not fund'
                };
            }
            if (user.status == false) {
                return {
                    statusCode: 403, // 403 Usuário encontrado porem não autorizado
                    message: 'User inactived'
                };
            }
            if (!await (0, crypt_1.verifyHash)(password, user.senha)) {
                return {
                    statusCode: 401, // não autenticado ou credenciais incorretas
                    message: 'Invalid password'
                };
            }
            const { senha, dt_deletado, ...userWithoutPassword } = user;
            const token = (0, auth_jwt_1.generateToken)(user.id); // isso da qui é uma pura de uma cambiarra !
            return {
                statusCode: 200, // codigo do pai ok 👍
                message: 'User authenticad',
                data: {
                    user: userWithoutPassword,
                    token: token
                }
            };
        }
        catch (error) {
            console.error("Error fetching login of user", error);
            return {
                statusCode: 500, // alguma coisa de errado não esta certo !
                message: 'Internal Server Error'
            };
        }
    }
    async register(userData) {
        const userByEmail = await this.userRepository.findByEmail(userData.email);
        const userByCpf = await this.userRepository.findByCpf(userData.cpf);
        if (userByEmail) {
            return {
                statusCode: 400,
                message: 'Email already in use'
            };
        }
        if (userByCpf) {
            return {
                statusCode: 400,
                message: 'CPF already in user'
            };
        }
        const hash = await (0, crypt_1.generateHash)(userData.senha);
        const newUser = { ...userData, senha: hash };
        const result = await this.userRepository.save(newUser);
        if (!result) {
            return {
                statusCode: 201,
                message: 'User registered successfully'
            };
        }
        return {
            statusCode: 400,
            message: 'erro desconhecido!'
        };
    }
    async findAll() {
        try {
            const users = await this.userRepository.findAll();
            if (!users) {
                return {
                    statusCode: 400,
                    message: 'not found'
                };
            }
            return {
                statusCode: 200,
                data: users
            };
        }
        catch (error) {
            console.error("Error fetching users:", error);
            return {
                statusCode: 500,
                message: 'Internal Server Error'
            };
        }
    }
    async authVerify(token) {
        const verify = (0, auth_jwt_1.verifyToken)(token);
        if (verify) {
            return { statusCode: 200, message: "Token is valid" };
        }
        return { statusCode: 401, message: "Invalid or expired token" };
    }
    async inactiveUser() {
    }
    async updateUser() {
    }
}
exports.UserService = UserService;
