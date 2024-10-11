import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import vehicleRoute from "./routes/vehicle.route.js";

const app = express();
dotenv.config();

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up MongoDB connection
mongoose.connect('mongodb://localhost:27017/vehicles', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use("/api", vehicleRoute);

const PORT = process.env.PORT || 4000;

// Export the app for testing
export default app; // Export the app

if (process.env.NODE_ENV !== 'test') { // Prevent starting the server during tests
    const server = app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

    // Unhandled Promise Rejection
    process.on("unhandledRejection", (err) => {
        console.log(`Error: ${err.message}`);
        console.log(`Shutting down the server due to Unhandled Promise Rejection`);

        server.close(() => {
            process.exit(1);
        });
    });
}
