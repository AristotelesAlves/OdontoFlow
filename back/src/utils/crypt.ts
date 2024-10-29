import brcrypt from 'bcrypt'

export async function generateHash(password: string){
    const salt = 10;
    const hash = await brcrypt.hash(password, salt)
    return hash
}

export async function verifyHash(password: string, hash: string){
    const match = await brcrypt.compare(password, hash)
    return match
}