import express from "express";
import router from "./routes";
import db from "./config/db";
import colors from 'colors';


// Conectar DB
export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        // console.log(colors.bgGreen.black.bold('Conexión exitosa a la DB'));

    } catch (error) {
        console.log( colors.bgRed.white.bold('Hubo un error al conectar la DB'));
        console.log(error);
    }
}

connectDB();

const server = express();

// Leer datos
server.use(express.json());

// Routes
server.use('/api/products', router);

server.get('/api', (req, res) => {
    res.json({msg: "Desde API"})
})



export default server;