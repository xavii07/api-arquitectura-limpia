import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares";

export class AuthRoutes {
  //TODO: Solo si se quiere hacer inyeccion de dependencias se debe usar el constructor

  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);

    const controler = new AuthController(authRepository);

    //TODO: Definir las rutas
    router.post("/login", controler.loginUser);
    router.post("/register", controler.registerUser);

    router.get("/", AuthMiddleware.validatJwt, controler.getUsers);

    return router;
  }
}
