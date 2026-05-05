import cors from 'cors';
import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js';

const app = express();

app.use(cors()); // Permite conexões de qualquer origem (CORS)
app.use(express.json());

app.use(usuarioRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

// Teste para conectar o servidor 