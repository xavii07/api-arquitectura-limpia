import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface RegisterToken {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface RegisterUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<RegisterToken>;
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

export class RegisterUser implements RegisterUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<RegisterToken> {
    const user = await this.authRepository.register(registerUserDto);
    const token = await this.signToken(
      { id: user.id, email: user.email },
      "2h"
    );

    if (!token) {
      throw CustomError.internalServerError("Error generating token");
    }

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
