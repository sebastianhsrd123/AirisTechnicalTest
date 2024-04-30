import express, { Router, Request, Response, NextFunction } from "express";
import { Options } from "../interfaces/public.metadata";
import cors from 'cors';


export class Server {
    public readonly app = express();
    private readonly port:number;
    private readonly routes:Router;

    constructor(options: Options) {
        const { port = 5000, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    
    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Middleware para manejar errores
        this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
    }

    private initializeRoutes() {
        this.app.use(this.routes);
    }

    public async start(){
        this.initializeMiddlewares();
        await this.app.use(cors());
        this.initializeRoutes();

        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}