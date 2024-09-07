import express from "express";
import router from "./routes";
import db from "./config/db";
import colors from 'colors';


// Conectar DB
async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.bgGreen.black.bold('Conexión exitosa a la DB'));
    } catch (error) {
        console.log( colors.bgRed.white.bold('Hubo un error al conectar la DB'));
        console.log(error);
    }
}

connectDB();

const server = express();

// Routes
server.use('/api/products', router);

export default server;