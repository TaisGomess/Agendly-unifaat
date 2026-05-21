import cors from 'cors';
import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';
import agendamentoRoutes from './routes/agendamentoRoutes.js';



const app = express();

app.use(cors());
app.use(express.json());

app.use(usuarioRoutes);
app.use(pacienteRoutes);
app.use(agendamentoRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

// Teste para conectar o servidor 