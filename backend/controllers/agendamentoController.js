import pool from '../database/db.js';

// LISTAR AGENDAMENTOS
export async function listarAgendamentos(req, res) {

    try {

        const result = await pool.query(`
            SELECT
                agendamentos.id,
                pacientes.nome AS paciente,
                data,
                horario,
                observacao

            FROM agendamentos

            JOIN pacientes
            ON pacientes.id = agendamentos.paciente_id

            ORDER BY data, horario
        `);

        res.json(result.rows);

    } catch (erro) {

        console.error('ERRO COMPLETO:', erro);

        res.status(500).json({
            erro: 'Erro ao listar agendamentos'
        });
    }
}


// CRIAR AGENDAMENTO
export async function criarAgendamento(req, res) {

    try {

        const {
            paciente_id,
            data,
            horario,
            observacao
        } = req.body;

        // validação
        if (!paciente_id || !data || !horario) {

            return res.status(400).json({
                erro: 'Paciente, data e horário são obrigatórios'
            });
        }

        // busca créditos do paciente
        const paciente = await pool.query(
            'SELECT creditos FROM pacientes WHERE id = $1',
            [paciente_id]
        );

        // verifica se existe
        if (paciente.rows.length === 0) {

            return res.status(404).json({
                erro: 'Paciente não encontrado'
            });
        }

        // pega créditos
        const creditos = paciente.rows[0].creditos;

        // bloqueia sem créditos
        if (creditos <= 0) {

            return res.status(400).json({
                erro: 'Paciente sem créditos disponíveis'
            });
        }

        // cria agendamento
        await pool.query(`
            INSERT INTO agendamentos
            (paciente_id, data, horario, observacao)

            VALUES ($1, $2, $3, $4)
        `,
        [
            paciente_id,
            data,
            horario,
            observacao
        ]);

        // desconta crédito
        await pool.query(`
            UPDATE pacientes
            SET creditos = creditos - 1
            WHERE id = $1
        `,
        [paciente_id]);

        res.status(201).json({
            mensagem: 'Agendamento criado com sucesso'
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            erro: 'Erro ao criar agendamento'
        });
    }
}