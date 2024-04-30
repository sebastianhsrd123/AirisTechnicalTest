

export class LoginUserDto {
    private constructor(public email: string, public password: string) { }

    static create(object: { [key: string]: any; }): [string?, LoginUserDto?] {

        const { email, password } = object;

        if (!email) return ['El correo es requerido'];
        if (!password) return ['La contraseña es requerida'];

        return [undefined, new LoginUserDto(email, password)];
    }
}