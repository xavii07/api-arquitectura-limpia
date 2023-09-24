import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoutes {
  //TODO: Solo si se quiere hacer inyeccion de dependencias se debe usar el constructor

  static get routes(): Router {
    const router = Router();
    const controler = new AuthController();

    //TODO: Definir las rutas
    router.post("/login", controler.loginUser);
    router.post("/register", controler.registerUser);

    return router;
  }
}
