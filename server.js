import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import http from "http";
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
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use("/api", vehicleRoute);

const PORT = process.env.PORT || 4000;


export default app;

var httpServer =  http.createServer(app)

if (process.env.NODE_ENV !== 'test') { 
    const server = httpServer.listen(PORT, () => {
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
