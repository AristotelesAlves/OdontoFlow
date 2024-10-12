
import { get } from './userDateStoredLocally';

export function checkRouterPrivate() {
    const user = get()

    if(!user){
        return false
    }

    return userAuthVerifyToken(user.token);
}