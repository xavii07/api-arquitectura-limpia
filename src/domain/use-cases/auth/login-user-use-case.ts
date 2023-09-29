import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

interface LoginToken {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface LoginUseCase {
  execute(loginUserDto: LoginUserDto): Promise<LoginToken>;
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

export class LoginUser implements LoginUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<LoginToken> {
    const user = await this.authRepository.login(loginUserDto);
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
