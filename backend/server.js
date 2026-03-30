import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();

app.use(express.json());

// usa as rotas
app.use(usuarioRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

// Teste para conectar o servidor 