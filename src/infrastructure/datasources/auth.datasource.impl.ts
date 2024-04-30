import { AuthDataSource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto } from "../../domain/dto/login-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { ResponseError } from "../../domain/errors/response.error";
import { UserMapper } from "../mappers/user.mapper";
import fs from 'fs';
export class AuthDataSourceImpl implements AuthDataSource {

    private readonly users: UserEntity[];
    constructor(private readonly filePath: string) {
        const rawData = fs.readFileSync('./src/data/user.data.json');
        this.users = JSON.parse(rawData.toString());
    };

    async login(LoginUserDto: LoginUserDto): Promise<UserEntity> {
        const { email, password } = LoginUserDto;
        try{
            const user = await this.findUserByEmail(email);
            if(!user) throw ResponseError.notFound('Usuario no encontrado. El usuario no esta registrado.');
            const isMatch = this.comparePassword(password, user.password);
            if(!isMatch) throw ResponseError.badRequest('Contraseña incorrecta');
            return UserMapper.userEntityFormObject(user);
        }catch(error){
            throw error;
        }
    }

    findUserByEmail(email: string): Promise<UserEntity | null> {
        const user = this.users.find(user => user.email === email);
        if(!user) return Promise.resolve(null);
        return Promise.resolve(user);
      }

    comparePassword(password: string, hash: string): boolean {
        if(password === hash) return true;
        return false;
    }
    
}