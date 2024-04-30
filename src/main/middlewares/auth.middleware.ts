import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";


export class AuthMiddleware {

    static validToken = async(req: Request, res: Response, next: NextFunction) => {

        const authorization = req.headers.authorization;
        if(!authorization) return res.status(401).json({ error: 'Unauthorized. No token provided' });
        if(!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized. Invalid token' });
        const token = authorization.split(' ').at(1) || '';

        try {

            const payload =  await JwtAdapter.validateToken(token);
            if(!payload) return res.status(401).json({ error: 'Unauthorized. Invalid token' });
            req.body.payload = payload;
            next();
        } catch (error) {
            res.status(500).json({ error: 'Internal server error'});
        }
    }
}