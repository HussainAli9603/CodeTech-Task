import express from 'express';
import { createVehicle, getAllVehicles } from '../controllers/vehicle.controller.js';

const router = express.Router();

// Define your route
router.post('/vehicles', createVehicle);
router.get('/vehicles',  getAllVehicles);

export default router;