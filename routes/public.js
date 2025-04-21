import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = express.Router();

//Mostrar todos os pratos
router.get('/dishes', async (req, res) => {
    try {
        const dishes = await prisma.dishes.findMany();
        if (dishes.length === 0) {
            return res.status(404).json({ message: 'Nenhum prato encontrado.' });
        }   
        res.status(200).json(dishes);
    } catch (error) {
        console.error('Error fetching dishes:', error);
        res.status(500).json({ message: 'Erro ao buscar pratos' });
    }
});

//Filtrar pratos por categoria

router.get('/categories', async (req, res) => {
    try {
        const {category} = req.query;
        if (!category) {
            return res.status(400).json({ message: 'Categoria não informada.' });
        }
        const dishes = await prisma.dishes.findMany({
            where: {
                category: category
            }
        });
        if (dishes.length === 0) {
            return res.status(404).json({ message: 'Nenhum prato encontrado nesta categoria.' });
        }
        res.status(200).json(dishes);
    }
    catch (error) {
        console.error('Error fetching dishes by category:', error);
        res.status(500).json({ message: 'Erro ao buscar pratos por categoria' });
    }
});

export default router;