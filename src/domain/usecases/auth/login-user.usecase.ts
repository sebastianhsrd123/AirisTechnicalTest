import Password from "antd/lib/input/Password";
import { JwtAdapter } from "../../../config/jwt.adapter";
import { LoginUserDto } from "../../dto/login-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { ResponseError } from "../../errors/response.error";
import { AuthRepository } from "../../repositories/auth.repository";
import { UserMetadata } from "../../../interfaces/user.metadata";


interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<[UserEntity, String]>;
}


export class LoginUser implements LoginUserUseCase {

    constructor(private readonly authRepository: AuthRepository,
        private readonly activateToken: (payload: Object, duration?: string) => Promise<string | null> = JwtAdapter.generateToken,
    ) { }
    async execute(loginUserDto: LoginUserDto): Promise<[UserEntity, String]> {

        const user = await this.authRepository.login(loginUserDto);
        if (!user) throw ResponseError.unauthorized('Credenciales inválidas');
        const payload = { userId: user.id, name: user.name, email: user.email, Password: user.password };
        const token = await this.activateToken(payload, '1h');
        if (!token) throw ResponseError.internalServerError('Error al generar el token de autenticación');
        const userAuth = await this.authRepository.login(user);
        return new Promise (resolve => resolve([userAuth, token]));
    }

}
