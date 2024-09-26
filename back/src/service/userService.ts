import { userInterface } from "../domain/user/userInterface";
import { UserRepository } from "../domain/user/UserRepository";
import { generateToken } from "../utils/auth-jwt";
import { generateHash, verifyHash } from "../utils/crypt";

export class UserService{

    constructor(private userRepository: UserRepository) {}

    async login(email: string, password: string){
        try {
            const user = await this.userRepository.findByEmail(email);

            if(!user){
                return {
                    statusCode: 404, // classico, não encontrado
                    message: 'User not fund'
                }
            }

            if(user.status == false){
                return {
                    statusCode: 403, // 403 Usuário encontrado porem não autorizado
                    message: 'User inactived'
                }
            }

            if (!await verifyHash(password, user.senha)) {
                return {
                    statusCode: 401, // não autenticado ou credenciais incorretas
                    message: 'Invalid password'
                }
            }
            const {senha, ...userWithoutPassword} = user
            const token = generateToken(user.id); // isso da qui é uma pura de uma cambiarra !
            return {
                statusCode: 200, // codigo do pai ok 👍
                message: 'User authenticad',
                data: {
                    user: userWithoutPassword,
                    token: token
                }
            }

        } catch (error) {
            console.error("Error fetching login of user", error);
            return {
                statusCode: 500, // alguma coisa de errado não esta certo !
                message: 'Internal Server Error'
            }
        }
    }

    async register(userData: Omit<userInterface, 'id'>): Promise<{statusCode:number, message: string, data?: userInterface}>{
        const userByEmail = await this.userRepository.findByEmail(userData.email)
        const userByCpf = await this.userRepository.findByCpf(userData.cpf)

        if(userByEmail){
            return {
                statusCode: 400,
                message: 'Email already in use'
            }
        }

        if(userByCpf){
            return {
                statusCode: 400,
                message: 'CPF already in user'
            }
        }

        const hash = await generateHash(userData.senha)

        const newUser = {...userData, senha: hash}

        const result = await this.userRepository.save(newUser)

        if(!result){
            return {
                statusCode: 400,
                message: 'Email already in use'
            }
        }

        return {
            statusCode: 201,
            message: 'User registered successfully',
            data: result
        }

    }

    
}