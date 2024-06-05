import express from 'express';
import * as categoriasController from '../controllers/categorias.Controller.js';
import {verificarSessao} from "../middleware/authMiddleware.js";
import { verificarUsuario } from "../middleware/nivelUsuario.js"; // Importando o middleware de validação do token


const router = express.Router();

router.get('/categorias', categoriasController.todasCategorias);
router.get('/categorias/:id', verificarSessao,verificarUsuario(2),categoriasController.buscarCategoria);

router.post('/criarCategoria', verificarSessao,verificarUsuario(2),categoriasController.criarCategoria);

router.put('/categorias/:id', verificarSessao,verificarUsuario(2),categoriasController.atualizarCategoria);
router.put('/preferencias/:id', verificarSessao,categoriasController.atualizarPreferencia);

router.delete('/categorias/:id', verificarSessao,verificarUsuario(2),categoriasController.deletarCategoria);

export default router;
