import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDataSourceImpl } from "../../infrastructure/datasources/auth.datasource.impl";
import { AuthRepositoryImpl } from "../../infrastructure/repositories/auth.repository.impl";

export class AuthRoutes {
    static get routes(): Router {
        const router = Router();
        console.log("LOGIN ROUTE")
        const dataSource = new AuthDataSourceImpl('../../data/user.data.json');
        const authRepository = new AuthRepositoryImpl(dataSource);
        const controller = new AuthController(authRepository);

        router.post('/login', controller.loginUser);

        return router;
    }
}
