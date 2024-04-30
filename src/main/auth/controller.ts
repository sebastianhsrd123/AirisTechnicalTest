import { JwtAdapter } from './../../config/jwt.adapter';
import { Request, response, Response } from "express";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { ResponseError } from "../../domain/errors/response.error";
import { LoginUserDto } from '../../domain/dto/login-user.dto';
import { LoginUser } from '../../domain/usecases/auth/login-user.usecase';


export class AuthController {

    constructor(private readonly authRepository: AuthRepository) { }

    private handleError = (error: any, res: Response) => {

        const responseData = {
            code: -2,
            error: error.name,
            token: null,
            message: error.message,
        };
        if (error instanceof ResponseError) {
            responseData.error = error.name;
            responseData.message = error.message;
            return res.status(error.code).json(responseData);
        }
        responseData.error = "Error inesperado";
        responseData.message = "Error interno en el servidor. contacte al administrador";
        return res.status(500).json(responseData);
    }

    loginUser = async (req: Request, res: Response) => {
        const [error, loginUserDto]: any = LoginUserDto.create(req.body);
        if (error) return res.status(400).json({ error });
        try {
            const [user, token] = await new LoginUser(this.authRepository).execute(loginUserDto);
            const userAuth = {...user, password: null}
            const responseData = {
                code: 0,
                data: userAuth,
                token: token,
                message: 'Inicio de sesion exitoso',
            };
            res.status(200).json(responseData);
        } catch (error) {
            this.handleError(error, res)
        };
    }


}