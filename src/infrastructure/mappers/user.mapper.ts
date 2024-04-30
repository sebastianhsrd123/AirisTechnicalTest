import { UserEntity } from "../../domain/entities/user.entity";
import { ResponseError } from "../../domain/errors/response.error";

export class UserMapper {

    static userEntityFormObject(object: {[key: string]: any}) {
        const { id, name, email, password } = object;

        if(!id) throw ResponseError.notFound('Id no encontrado');
        if(!name) throw ResponseError.notFound('nombre no encontrado');
        if(!email) throw ResponseError.notFound('email no encontrado');
        if(!password) throw ResponseError.notFound('contraseña no encontrado');

        return new UserEntity(id, name, email, password);
    }
}