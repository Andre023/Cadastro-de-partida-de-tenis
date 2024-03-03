import express from 'express';
import cors from "cors";
import { clienteRouter } from "./src/routes/clientes.js";
import { quadraRouter } from "./src/routes/quadras.js";
import { partidasRouter } from "./src/routes/partidas.js";

const server = express();
const PORT = 4400;

// Middleware para analisar o corpo das requisições JSON
server.use(express.json());
server.use(cors());

// Routes
server.get('/', (request, response) => {
    response.json({
        message: 'Status: Server is running.'
    });
});

server.use(clienteRouter);
server.use(quadraRouter);
server.use(partidasRouter);

server.listen(PORT, () => {
    console.log(`[SERVER] Server is running on port ${PORT}`);
});
