export interface userInterface {
    id: number;
    nome_usuario: string;
    email: string;
    cpf: string;
    status: boolean;
    senha: string;
    dt_atualizado: Date;
    dt_deletado: Date | null;
  }