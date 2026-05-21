import express from 'express';
import {
    listarPacientes,
    criarPaciente,
    excluirPaciente
} from '../controllers/pacienteController.js';

const router = express.Router();

router.get('/pacientes', listarPacientes);
router.post('/pacientes', criarPaciente);
router.delete('/pacientes/:id', excluirPaciente);

export default router;