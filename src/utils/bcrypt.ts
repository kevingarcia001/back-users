
import * as bcrypt from 'bcrypt';

export const encrypt = async (Password: string, salt = 10) =>{
    return await bcrypt.hash(Password, salt)
}

export const compare = async (Password: string, hash: string) => {
    return await bcrypt.compare(Password, hash)
}