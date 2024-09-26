import { userInterface } from "./userInterface";

export interface UserRepository {
    findAll(): Promise<userInterface[]>;
    findByCpf(cpf: string): Promise<userInterface | null>;
    findByEmail(email: string): Promise<userInterface | null>;
    save(user: Omit<userInterface, 'id'>): Promise<userInterface> | null;
    // findById(id: number): Promise<userInterface | null>;
    // deleteById(id: number): Promise<boolean>;
  }