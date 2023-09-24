//los datasources son las reglas de negocio de la aplicacion no son implementaciones de las cuales se van a obtener los datos

import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDatasource {
  //TODO:
  //abstract login()

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
