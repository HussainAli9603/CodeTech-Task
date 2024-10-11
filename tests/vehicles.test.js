// tests/vehicles.test.js
import request from 'supertest';
import app from '../server.js'; 
import Vehicle from '../models/vehicle.model.js'; 
import mongoose from "mongoose";

jest.mock('../models/vehicle.model.js'); 

describe('GET /api/vehicles', () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should return 200 and the list of vehicles when vehicles exist', async () => {
        const vehiclesMock = [
            { make: 'Toyota', model: 'Corolla', year: 2020, color: 'red', vin: 'ASDSDSDSSDASD', mileage: 3020  },
            { make: 'Honda', model: 'Civic', year: 2019, color: 'red', vin: 'ASDSDSDSSDASD', mileage: 3020 },
        ];

        Vehicle.find.mockResolvedValue(vehiclesMock); // Mock Mongoose find method

        const response = await request(app).get('/api/vehicles');

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.vehicles).toEqual(vehiclesMock);
    });

    it('should return 404 if no vehicles are found', async () => {
        Vehicle.find.mockResolvedValue([]); // Mocking an empty result
    
        const response = await request(app).get('/api/vehicles');
    
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Vehicles not found');
    });
    

    it('should handle server errors gracefully', async () => {
        Vehicle.find.mockRejectedValue(new Error('Server Error')); // Simulate a server error

        const response = await request(app).get('/api/vehicles');

        expect(response.status).toBe(500);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Server Error');
    });
});

describe('POST /api/vehicles', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a vehicle successfully and return 201', async () => {
        const vehicleData = {
            _id: '12345',
            make: 'Toyota',
            models: 'Corolla',
            year: 2020,
            color: 'Blue',
            vin: '1HGCM82633A123456',
            mileage: 10000
        };

        Vehicle.create.mockResolvedValue(vehicleData); // Mock the create method

        const response = await request(app)
            .post('/api/vehicles')
            .send({
                make: 'Toyota',
                models: 'Corolla',
                year: 2020,
                color: 'Blue',
                vin: '1HGCM82633A123456',
                mileage: 10000
            });

        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Vehicle created successfully');
        expect(response.body.data).toEqual({
            uid: vehicleData._id,
            make: vehicleData.make,
            model: vehicleData.models,
            year: vehicleData.year,
            vin: vehicleData.vin,
            color: vehicleData.color,
            mileage: vehicleData.mileage,
        });
    });

    it('should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post('/api/vehicles')
            .send({
                make: 'Toyota',
                year: 2020,
                vin: '1HGCM82633A123456',
                mileage: 10000
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Missing required fields');
    });

    it('should return 400 if there is an error creating the vehicle', async () => {
        Vehicle.create.mockRejectedValue(new Error('Database error'));

        const response = await request(app)
            .post('/api/vehicles')
            .send({
                make: 'Toyota',
                models: 'Corolla',
                year: 2020,
                color: 'Blue',
                vin: '1HGCM82633A123456',
                mileage: 10000
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Database error');
    });
});

