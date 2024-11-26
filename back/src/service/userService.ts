import { userInterface } from "../domain/interface/userInterface";
import { UserRepositoryInterface } from "../domain/repository/UserRepositoryInterface";
import { generateToken, verifyToken } from "../utils/auth-jwt";
import { generateHash, verifyHash } from "../utils/crypt";

export class UserService{

    constructor(
        private userRepository: UserRepositoryInterface
    ) {}

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
            
            const {senha,dt_deletado, ...userWithoutPassword} = user
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

    async register(userData: Omit<userInterface, 'id'>): Promise<{statusCode:number, message?: string, data?: userInterface}>{

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
                statusCode: 201,
                message: 'User registered successfully'
            }
        }

        return {
            statusCode: 400,
            message: 'erro desconhecido!'
        }

    }

    async findAll(): Promise<{statusCode:number, message?: string, data?: Omit<userInterface, "senha">[]}> {
        try {
            const users = await this.userRepository.findAll();

            if(!users){
                return {
                    statusCode: 400,
                    message: 'not found'
                }
            }

            return {
                statusCode: 200,
                data: users 
            };
        } catch (error) {
            console.error("Error fetching users:", error);
            return {
                statusCode: 500,
                message: 'Internal Server Error'
            };
        }
    }

    async authVerify(token: string): Promise<{ statusCode: number; message: string; }> {
        const verify = verifyToken(token);
        if (verify) {
            return { statusCode: 200, message: "Token is valid" }; 
        }
        return { statusCode: 401, message: "Invalid or expired token" };
    }

    async inactiveUser(){

    }

    async updateUser(){

    }
}