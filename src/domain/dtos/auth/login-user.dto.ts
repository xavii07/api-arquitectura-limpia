import { Validators } from "../../../config";

export class LoginUserDto {
  constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ["email is required", undefined];
    if (!password) return ["password is required", undefined];
    if (!Validators.email.test(email)) return ["email is invalid", undefined];

    return [undefined, new LoginUserDto(email, password)];
  }
}
