import { AuthDataSource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto } from "../../domain/dto/login-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private readonly authDataSource: AuthDataSource) { }

    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDataSource.login(loginUserDto);
    }
}