import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  //TODO: Conexion a base de datos

  //TODO: Iniciar servidor
  new Server({
    port: 4800,
    routes: AppRoutes.routes,
  }).start();
}
