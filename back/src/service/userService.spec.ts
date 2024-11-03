import { describe, it, expect, vi } from 'vitest';
import { UserService } from './userService';
import { UserInMemoryRepository } from '../repositories/in-memory/memory-user';

describe('Serviços Usuário', () => {
    const memory = new UserInMemoryRepository();
    const userService = new UserService(memory);

    describe('login', () => {
        it('Usuário não cadastrado => 404', async () => {
            const response = await userService.login('notfound@example.com', 'password');
            expect(response).toEqual({ statusCode: 404, message: 'User not fund' });
        });
    
        it('Usuário desativado => 403', async () => {
            const response = await userService.login('joaocabral@gmail.com', 'password');
            expect(response).toEqual({ statusCode: 403, message: 'User inactived' });
        });
    
        it('Senha incorreta => 401', async () => {
            const response = await userService.login('aristotelesalves39@gmail.com', 'wrongpassword');
            expect(response).toEqual({ statusCode: 401, message: 'Invalid password' });
        });
    
        it('Usuário autenticado => 200', async () => {
            const response = await userService.login('aristotelesalves39@gmail.com', 'eunaolembro');
            expect(response).toEqual({ 
                statusCode: 200, 
                message: 'User authenticad',
                data: {
                    user: {
                        id: expect.any(Number),
                        nome_usuario: expect.any(String),
                        email: 'aristotelesalves39@gmail.com',
                        cpf: expect.any(String),
                        status: true,
                        id_clinica: expect.any(Number),
                        dt_atualizado: expect.any(Date),
                    },
                    token: expect.any(String),
                },
            });
        });
    })

    describe('Register', () => {
        it('Email já cadastrado => 404', async () => {
            const response = await userService.register({
                cpf:'3213123134',
                dt_atualizado: new Date(),
                dt_deletado: null,
                email: 'aristotelesalves39@gmail.com',
                id_clinica: 1,
                nome_usuario:'Aristoteles',
                senha: '83743849d',
                status: true
            });
            expect(response).toEqual({ statusCode: 400, message: 'Email already in use' });
        });

        it('CPF já cadastrado => 404', async () => {
            const response = await userService.register({
                cpf:'323132',
                dt_atualizado: new Date(),
                dt_deletado: null,
                email: 'aristotelesalves@gmail.com',
                id_clinica: 1,
                nome_usuario:'Aristoteles',
                senha: '83743849d',
                status: true
            });
            expect(response).toEqual({ statusCode: 400, message: 'CPF already in user' });
        });

        it('Usuário cadastrado com sucesso => 404', async () => {
            const response = await userService.register({
                cpf:'32313332',
                dt_atualizado: new Date(),
                dt_deletado: null,
                email: 'aristotelesalves@gmail.com',
                id_clinica: 1,
                nome_usuario:'Aristoteles',
                senha: '83743849d',
                status: true
            });
            expect(response).toEqual({ 
                statusCode: 201,
                message: 'User registered successfully'
             });
        });
    })

    describe('FindAll', () => {
        it('retornar todos os usuários => 200', async () => {
            const response = await userService.findAll();
            expect(response).toEqual({
                statusCode: 200,
                data: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        nome_usuario: expect.any(String),
                        email: expect.any(String),
                        cpf: expect.any(String),
                        status: true,
                        id_clinica: expect.any(Number),
                        dt_atualizado: expect.any(Date),
                        dt_deletado: null,
                    })
                ])
            });
        });
    })
});
