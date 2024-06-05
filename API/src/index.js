import app from "./app.js";
import { PORTA } from "./config.js";

app.listen(PORTA);

console.log("Servidor ON na porta: ", PORTA);
