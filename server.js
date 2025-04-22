import express from 'express';
import cors from 'cors';
import publicRoutes from './routes/public.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', publicRoutes);

app.listen(3000, () => console.log('Server is running on port 3000'));

//git remote add origin https://github.com/Araujo2007/Sistema-Cardapio.git
//git branch -M main
//git push -u origin main

//3 rotas: Criar pratos, separar por categoria, atualizar preço

//publica;

//Categoria

//privada:

// Criar prato

// Atualizar preço