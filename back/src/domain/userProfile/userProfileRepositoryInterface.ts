import { userProfileInterface } from "./userProfileInterface";

export interface UserProfileRepositoryInterface {
    findById(id: number): Promise<userProfileInterface>;
    create(profile: userProfileInterface): Promise<userProfileInterface | null>;
    // delete(id:number): Promise<string>;
}