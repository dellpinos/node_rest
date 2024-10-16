import express from "express";
import router from "./routes";
import db from "./config/db";
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";


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

// Permitir Conexiones
const corsOptions : CorsOptions = {
    origin: function(origin, callback) {
        if( origin === process.env.FRONTEND_URL){
            callback(null, true);
        } else {
            callback(new Error('Error de CORS'));
        }
    }
}

server.use(cors(corsOptions));

// Leer datos de los JSON
server.use(express.json());

// Logs en la consola
server.use(morgan('dev'));
// Routes
server.use('/api/products', router);

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));


export default server;