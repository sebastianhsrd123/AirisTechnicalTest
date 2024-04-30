import { LoginUserDto } from "../dto/login-user.dto";
import { UserEntity } from "../entities/user.entity";


export abstract class AuthDataSource {

    abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

}