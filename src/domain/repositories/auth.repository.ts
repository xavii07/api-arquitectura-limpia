//los repositories son quienes se van a comunicar con los datasources son abstracciones

import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {
  //TODO:
  //abstract login()

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
