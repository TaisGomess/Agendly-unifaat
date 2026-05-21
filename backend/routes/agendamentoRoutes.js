import express from 'express';

import {
    listarAgendamentos,
    criarAgendamento
} from '../controllers/agendamentoController.js';

const router = express.Router();

// LISTAR
router.get('/agendamentos', listarAgendamentos);

// CRIAR
router.post('/agendamentos', criarAgendamento);

export default router;