import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      //1. Verificar email
      const user = await UserModel.findOne({ email });
      if (!user) throw CustomError.badRequest("Bad credentials - Email");

      //2. Verificar password
      const isValidPassword = this.comparePassword(
        password,
        user.password as string
      );

      if (!isValidPassword)
        throw CustomError.badRequest("10 Bad credentials - Password");

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { email, name, password } = registerUserDto;

    try {
      //1. verificar email
      const existsEmail = await UserModel.findOne({ email });
      if (existsEmail) throw CustomError.badRequest("Email already exists");

      const user = await UserModel.create({
        name,
        email,
        password: this.hashPassword(password),
      });

      await user.save();

      //2. encriptar password

      //3. mapear a base de datos

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServerError();
    }
  }
}
