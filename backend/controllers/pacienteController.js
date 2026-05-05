import pool from '../database/db.js';

export async function listarPacientes(req, res) {
    try {
    const result = await pool.query('SELECT * FROM pacientes');
    res.json(result.rows);
    } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao listar pacientes' });
    }
}

export async function criarPaciente(req, res) {
    try {
    const { nome, contato } = req.body;

    if (!nome || !contato) {
        return res.status(400).json({ erro: 'Nome e contato são obrigatórios' });
    }

    await pool.query(
        'INSERT INTO pacientes (nome, contato) VALUES ($1, $2)',
        [nome, contato]
    );

    res.status(201).json({ mensagem: 'Paciente criado com sucesso' });
    } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao criar paciente' });
    }
}