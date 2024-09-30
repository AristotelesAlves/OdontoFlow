import { UserProfileRepositoryInterface } from "../domain/userProfile/userProfileRepositoryInterface";

interface AuthProfileInterface {
    id: number;
    feature: 
        | 'lista_usuario'
        | 'criar_usuario'
        | 'editar_usuario'
        | 'inativar_usuario'
        | 'deletar_usuario'
        | 'adicionar_produto'
        | 'inativar_produto'
        | 'ajuste_estoque'
        | 'saida_produto'
        | 'entrada_produto'
        | 'uso_produto';
}

export class AuthProfilePermision {
    constructor(private profile: UserProfileRepositoryInterface) {}

    async verification(props: AuthProfileInterface): Promise<boolean> {
        try {
            const userProfile = await this.profile.findById(props.id);
            if (!userProfile) {
                return false;
            }

            return userProfile[props.feature] || false;

        } catch (error) {
            console.error("Error during verification:", error);
            return false; 
        }
    }
}
