export interface userInterface {
    id: number;
    nome_usuario: string;
    email: string;
    cpf: string;
    status: boolean;
    senha: string;
    id_perfil_usuario: number;
    id_clinica: number;
    dt_atualizado: Date;
    dt_deletado: Date | null;
  }