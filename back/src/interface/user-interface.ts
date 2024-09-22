export interface userInterface {
    id?: number;
    nome_usuario: string,
    cpf: string,
    dt_atualizado: Date,
    dt_deletado: Date | null,
    email: string,
    senha: string,
    status: boolean,
}