export class ResponseError extends Error {
    constructor(public readonly code: number, public message: string) {
        super(message);
    }

    static badRequest(message: string) {
        return new ResponseError(400, message);
    }

    static unauthorized(message: string) {
        return new ResponseError(401, message);
    }

    static forbidden(message: string) {
        return new ResponseError(403, message);
    }

    static notFound(message: string) {
        return new ResponseError(404, message);
    }

    static conflict(message: string) {
        return new ResponseError(409, message);
    }

    static internalServerError(message: string) {
        return new ResponseError(500, message);
    }

    static serviceUnavailable(message: string) {
        return new ResponseError(503, message);
    }

    static custom(code: number, message: string) {
        return new ResponseError(code, message);
    }

    static noProcessableEntity(message: string) {
        return new ResponseError(422, message);
    }

    static badGateway(message: string) {
        return new ResponseError(502, message);
    }

    static gatewayTimeout(message: string) {
        return new ResponseError(504, message);
    }

    static tooManyRequests(message: string) {
        return new ResponseError(429, message);
    }

    static notImplemented(message: string) {
        return new ResponseError(501, message);
    }
}