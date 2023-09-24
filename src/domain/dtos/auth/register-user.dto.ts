import { Validators } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  //?DTO: Data Transfer Object significa que es un objeto que se usa para transferir datos entre capas
  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    //TODO: Validar los datos de entrada con paquetes como express-validator

    const { email, name, password } = object;

    if (!name) return ["name is required", undefined];
    if (!email) return ["email is required", undefined];
    if (!Validators.email.test(email)) return ["email is invalid", undefined];
    if (!password) return ["password is required", undefined];
    if (password.length < 8)
      return ["password must be at least 8 characters", undefined];

    return [
      undefined,
      new RegisterUserDto(name, email.toLowerCase(), password),
    ];
  }
}
