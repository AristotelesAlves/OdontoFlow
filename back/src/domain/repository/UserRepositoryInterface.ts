import { userInterface } from "../interface/userInterface";

export interface UserRepositoryInterface {
    findAll(): Promise<Omit<userInterface, 'senha'>[]>;
    findByCpf(cpf: string): Promise<userInterface | null>;
    findByEmail(email: string): Promise<userInterface | null>;
    save(user: Omit<userInterface, 'id'>): Promise<userInterface> | null;
    // findById(id: number): Promise<userInterface | null>;
    // deleteById(id: number): Promise<boolean>;
  }