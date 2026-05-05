import express from 'express';
import { listarPacientes, criarPaciente } from '../controllers/pacienteController.js';

const router = express.Router();

router.get('/pacientes', listarPacientes);
router.post('/pacientes', criarPaciente);

export default router;