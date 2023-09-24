import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain";

export class AuthController {
  //TODO: Inyectar dependencias crear el constructor

  constructor() {}

  //TODO: debe llamar a los casos de uso de la aplicacion
  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    res.status(201).json(registerUserDto);
  };

  loginUser = (req: Request, res: Response) => {};
}
