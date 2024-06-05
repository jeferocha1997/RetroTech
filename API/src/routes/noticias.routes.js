import express from 'express';
import * as noticiasController from '../controllers/noticias.Controller.js';
import { verificarSessao } from '../middleware/authMiddleware.js'; // Importe o middleware de verificação de token
import { verificarUsuario } from "../middleware/nivelUsuario.js";
import {atualizarNoticiaPorId, buscarNoticiasPorIdUsuario} from "../controllers/noticias.Controller.js"; // Importando o middleware de validação do token


const router = express.Router();

router.get('/', noticiasController.buscarNoticias);
router.get('/paginaInicial/:id', verificarSessao, noticiasController.buscarNoticiasPorIdUsuario);

router.post('/criarNoticia/',verificarSessao, verificarUsuario(2),  noticiasController.criarNoticia);

router.put('/noticias/:id', verificarSessao, verificarUsuario(2),noticiasController.atualizarNoticiaPorId);

router.delete('/noticias/:id', verificarSessao, verificarUsuario(2),noticiasController.deletarNoticiasPorId);

export default router;
