export function save({ id, name, email, clinica_id, token }) {
    if (typeof window !== 'undefined') {
        const userDate = {
            id,
            name,
            email,
            clinica_id,
            token,
        };
        localStorage.setItem('userDate', JSON.stringify(userDate));
    }
}

export function get() {
    if (typeof window !== 'undefined') { 
        const user = localStorage.getItem('userDate');
        return user ? JSON.parse(user) : null;
    }
    return 
}

export function remover() {
    if (typeof window !== 'undefined') { 
        localStorage.removeItem('userDate');
    }
}
