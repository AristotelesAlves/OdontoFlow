export function save(user){
    const { id, name, email, clinica_id, token } = user;
    
    const userDate = {
      id,
      name,
      email,
      clinica_id,
      token,
    };

    localStorage.setItem('userDate', JSON.stringify(dadosUsuario));
}

export function get(){
    const user = localStorage.getItem('userDate');
    return user ? JSON.parse(user) : null;
}

export function remover(){
    localStorage.removeItem('userDate');
}