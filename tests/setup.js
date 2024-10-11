import mongoose from 'mongoose';

afterAll(async () => {
    await mongoose.connection.close(); // Close the connection after tests
});
