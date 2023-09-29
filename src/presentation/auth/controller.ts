import { Request, Response } from "express";
import {
  AuthRepository,
  CustomError,
  RegisterUser,
  RegisterUserDto,
  LoginUser,
} from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthController {
  //TODO: Inyectar dependencias crear el constructor
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.codeStatus).json({ error: error.message });
    }
  };

  //TODO: debe llamar a los casos de uso de la aplicacion
  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) {
      return res.status(400).json(error);
    }

    new RegisterUser(this.authRepository, JwtAdapter.generateToken)
      .execute(registerUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) {
      return res.status(400).json(error);
    }

    new LoginUser(this.authRepository, JwtAdapter.generateToken)
      .execute(loginUserDto!)
      .then((user) => res.json(user))
      .catch((error) => this.handleError(error, res));
  };

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then((user) => res.json(user))
      .catch(() => res.status(500).json({ error: "Internal server error" }));
  };
}
