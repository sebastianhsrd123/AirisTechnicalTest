import jwt from 'jsonwebtoken';

export class JwtAdapter {

    static async generateToken(payload: Object, duration: string = '1h'): Promise<string | null> {
        return new Promise((resolve) => {
            jwt.sign(payload, 'SECRET_SEED', { expiresIn: duration }, (err, token) => {
                if (err) {
                    return resolve(null);
                }
                resolve(token!);
            });
        });
    }

    static validateToken(token: string): Promise<any> {

        return new Promise((resolve) => {
            jwt.verify(token, 'SECRET_SEED', (err, decoded) => {
                if (err) {
                    return resolve(null);
                }
                return Promise.resolve(decoded);
            });

        });


    }

}