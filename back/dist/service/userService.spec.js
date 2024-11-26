"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const userService_1 = require("./userService");
const memory_user_1 = require("../repositories/in-memory/memory-user");
(0, vitest_1.describe)('Serviços Usuário', () => {
    const memory = new memory_user_1.UserInMemoryRepository();
    const userService = new userService_1.UserService(memory);
    (0, vitest_1.describe)('login', () => {
        (0, vitest_1.it)('Usuário não cadastrado => 404', async () => {
            const response = await userService.login('notfound@example.com', 'password');
            (0, vitest_1.expect)(response).toEqual({ statusCode: 404, message: 'User not fund' });
        });
        (0, vitest_1.it)('Usuário desativado => 403', async () => {
            const response = await userService.login('joaocabral@gmail.com', 'password');
            (0, vitest_1.expect)(response).toEqual({ statusCode: 403, message: 'User inactived' });
        });
        (0, vitest_1.it)('Senha incorreta => 401', async () => {
            const response = await userService.login('aristotelesalves39@gmail.com', 'wrongpassword');
            (0, vitest_1.expect)(response).toEqual({ statusCode: 401, message: 'Invalid password' });
        });
        (0, vitest_1.it)('Usuário autenticado => 200', async () => {
            const response = await userService.login('aristotelesalves39@gmail.com', 'eunaolembro');
            (0, vitest_1.expect)(response).toEqual({
                statusCode: 200,
                message: 'User authenticad',
                data: {
                    user: {
                        id: vitest_1.expect.any(Number),
                        nome_usuario: vitest_1.expect.any(String),
                        email: 'aristotelesalves39@gmail.com',
                        cpf: vitest_1.expect.any(String),
                        status: true,
                        id_clinica: vitest_1.expect.any(Number),
                        dt_atualizado: vitest_1.expect.any(Date),
                    },
                    token: vitest_1.expect.any(String),
                },
            });
        });
    });
    (0, vitest_1.describe)('Register', () => {
        (0, vitest_1.it)('Email já cadastrado => 404', async () => {
            const response = await userService.register({
                cpf: '3213123134',
                dt_atualizado: new Date(),
                dt_deletado: null,
                email: 'aristotelesalves39@gmail.com',
                id_clinica: 1,
                nome_usuario: 'Aristoteles',
                senha: '83743849d',
                status: true
            });
            (0, vitest_1.expect)(response).toEqual({ statusCode: 400, message: 'Email already in use' });
        });
        (0, vitest_1.it)('CPF já cadastrado => 404', async () => {
            const response = await userService.register({
                cpf: '323132',
                dt_atualizado: new Date(),
                dt_deletado: null,
                email: 'aristotelesalves@gmail.com',
                id_clinica: 1,
                nome_usuario: 'Aristoteles',
                senha: '83743849d',
                status: true
            });
            (0, vitest_1.expect)(response).toEqual({ statusCode: 400, message: 'CPF already in user' });
        });
        (0, vitest_1.it)('Usuário cadastrado com sucesso => 404', async () => {
            const response = await userService.register({
                cpf: '32313332',
                dt_atualizado: new Date(),
                dt_deletado: null,
                email: 'aristotelesalves@gmail.com',
                id_clinica: 1,
                nome_usuario: 'Aristoteles',
                senha: '83743849d',
                status: true
            });
            (0, vitest_1.expect)(response).toEqual({
                statusCode: 201,
                message: 'User registered successfully'
            });
        });
    });
    (0, vitest_1.describe)('FindAll', () => {
        (0, vitest_1.it)('retornar todos os usuários => 200', async () => {
            const response = await userService.findAll();
            (0, vitest_1.expect)(response).toEqual({
                statusCode: 200,
                data: vitest_1.expect.arrayContaining([
                    vitest_1.expect.objectContaining({
                        id: vitest_1.expect.any(Number),
                        nome_usuario: vitest_1.expect.any(String),
                        email: vitest_1.expect.any(String),
                        cpf: vitest_1.expect.any(String),
                        status: true,
                        id_clinica: vitest_1.expect.any(Number),
                        dt_atualizado: vitest_1.expect.any(Date),
                        dt_deletado: null,
                    })
                ])
            });
        });
    });
});
