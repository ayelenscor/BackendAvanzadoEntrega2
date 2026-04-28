import express from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mockingUtil.js';
import { UserRepository } from '../dao/userRepository.js';
import { PetRepository } from '../dao/petRepository.js';

const router = express.Router();
const userRepository = new UserRepository();
const petRepository = new PetRepository();

router.post('/generateData', async (req, res) => {
    try {
        const { users = 0, pets = 0 } = req.body;

        if (users < 0 || pets < 0) {
            return res.status(400).json({
                success: false,
                message: 'Los parámetros users y pets deben ser mayores o iguales a 0',
            });
        }

        const response = {
            success: true,
            message: 'Datos generados e insertados correctamente',
            usersGenerated: 0,
            petsGenerated: 0,
        };

        if (users > 0) {
            const generatedUsers = await generateMockUsers(users);
            const insertedUsers = await userRepository.createMultipleUsers(generatedUsers);
            response.usersGenerated = insertedUsers.length;
        }

        if (pets > 0) {
            const generatedPets = generateMockPets(pets);
            const insertedPets = await petRepository.createMultiplePets(generatedPets);
            response.petsGenerated = insertedPets.length;
        }

        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al generar e insertar datos',
            error: error.message,
        });
    }
});

router.get('/mockingusers', async (req, res) => {
    try {
        const quantity = parseInt(req.query.quantity) || 50;
        const users = await generateMockUsers(quantity);
        res.status(200).json({
            success: true,
            quantity: users.length,
            payload: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error generating mock users',
            error: error.message
        });
    }
});

router.get('/mockingpets', (req, res) => {
    try {
        const quantity = parseInt(req.query.quantity) || 10;
        const pets = generateMockPets(quantity);
        res.status(200).json({
            success: true,
            quantity: pets.length,
            payload: pets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error generating mock pets',
            error: error.message
        });
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await userRepository.getAllUsers();
        res.status(200).json({
            success: true,
            quantity: users.length,
            payload: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving users',
            error: error.message
        });
    }
});

router.get('/pets', async (req, res) => {
    try {
        const pets = await petRepository.getAllPets();
        res.status(200).json({
            success: true,
            quantity: pets.length,
            payload: pets
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving pets',
            error: error.message
        });
    }
});

export default router;
