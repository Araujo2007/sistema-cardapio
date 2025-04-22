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

router.post('/register_dishes', async (req, res) => {
    try {
        const dish = req.body;

    const dishData = await prisma.dishes.create({
        data: {
            name: dish.name,
            price: dish.price,
            category: dish.category
        },
    });
console.log(dishData);
    res.status(201).json({ message: 'Prato cadastrado com sucesso!', dishData });

    } catch (error) {
        console.error('Error creating dish:', error);
        res.status(500).json({ message: 'Erro ao cadastrar prato' });
        
    }
});

//Atualizar preço
router.put('/update_price/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { price } = req.body;

        const parseId = Number(id);
        if (isNaN(parseId)) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const updatedDish = await prisma.dishes.update({
            where: { id: Number(id) },
            data: { price },
        });

        res.status(200).json({ message: 'Preço atualizado com sucesso!', updatedDish });
    } catch (error) {
        console.error('Error updating dish price:', error);
        res.status(500).json({ message: 'Erro ao atualizar preço do prato' });
    }
});

export default router;