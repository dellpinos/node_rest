import express from "express";

const server = express();

// Routing
server.get('/', (req, res) => {

    const datos = [
        { id: 1, nombre: "Martín" },
        { id: 2, nombre: "Marina" }
    ];
    res.send("<h1>Hola Mundo</h1>");
});



export default server;