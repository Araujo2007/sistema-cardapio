import express from 'express';
import cors from 'cors';
import publicRoutes from './routes/public.js';
import privateRoutes from './routes/private.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', publicRoutes);
app.use('/', privateRoutes);

app.listen(3000, () => console.log('Server is running on port 3000'));

//3 rotas: Criar pratos, separar por categoria, atualizar preço

//publica;

//Categoria

//privada:

// Criar prato

// Atualizar preço