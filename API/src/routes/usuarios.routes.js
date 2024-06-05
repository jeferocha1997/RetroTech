import express from 'express';
import * as usuarioController from '../controllers/usuarios.Controller.js';
import { verificarSessao } from "../middleware/authMiddleware.js"; //  middleware de validação do token
import { verificarUsuario } from "../middleware/nivelUsuario.js"; //  nivel_usuario = 2

const router = express.Router();

router.post('/login', usuarioController.buscarUsuario);
router.post('/criarConta', usuarioController.criarUsuario);

router.get('/usuarios/:id', verificarSessao, usuarioController.buscarUsuario);

router.put('/usuarios/:id', verificarSessao, verificarUsuario(2),usuarioController.atualizarUsuario); // Rota para atualizar usuário por ID, protegida pelo token JWT

router.delete('/usuarios/:id', verificarSessao, verificarUsuario(2),usuarioController.deletarUsuarioPorId); // Rota para deletar usuário por ID, protegida pelo token JWT

export default router;
