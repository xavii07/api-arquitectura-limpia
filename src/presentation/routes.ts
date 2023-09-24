import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  //TODO: Solo si se quiere hacer inyeccion de dependencias se debe usar el constructor

  static get routes(): Router {
    const router = Router();

    //TODO: Definir las rutas
    router.get("/api/auth", AuthRoutes.routes);

    return router;
  }
}
