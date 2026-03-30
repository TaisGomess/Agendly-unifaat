import express from 'express';
import { listarUsuarios, criarUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/usuarios', listarUsuarios);
router.post('/usuarios', criarUsuario);

export default router;

import { loginUsuario } from '../controllers/usuarioController.js';

router.post('/login', loginUsuario);
