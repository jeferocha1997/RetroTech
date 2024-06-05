import express from "express";
//import cors from "cors";
//import morgan from "morgan";


import usuariosRotas from "./routes/usuarios.routes.js";
import categoriaRoutes from "./routes/categorias.routes.js";
import noticiasRotas from "./routes/noticias.routes.js";

const app = express();

//app.use(cors());
//app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", usuariosRotas);
app.use("/api", categoriaRoutes);
app.use("/api", noticiasRotas);

export default app;
