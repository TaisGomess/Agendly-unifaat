import pool from '../database/db.js';

export const listarUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar usuários');
  }
};

export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    // 🔥 VALIDAÇÃO
    if (!nome || !email || !senha) {
      return res.status(400).json({
        erro: 'Nome, email e senha são obrigatórios'
      });
    }

    const result = await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senha]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar usuário');
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // validação
    if (!email || !senha) {
      return res.status(400).json({
        erro: 'Email e senha são obrigatórios'
      });
    }

    // buscar usuário
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        erro: 'Usuário não encontrado'
      });
    }

    const usuario = result.rows[0];

    // verificar senha
    if (usuario.senha !== senha) {
      return res.status(401).json({
        erro: 'Senha incorreta'
      });
    }

    res.json({
      mensagem: 'Login realizado com sucesso',
      usuario
    });

  } catch (error) {
    console.error(error);
    res.status(500).send('Erro no login');
  }
};