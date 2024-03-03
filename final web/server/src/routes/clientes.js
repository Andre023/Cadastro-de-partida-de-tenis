import { Router } from "express";
import { GetAllCliente } from "../controller/clientes/GetAllCliente.js";
import { GetByIdCliente } from "../controller/clientes/GetByIdCliente.js";
import { CreateCliente } from "../controller/clientes/CreateCliente.js";
import { UpdateCliente } from "../controller/clientes/UpdateCliente.js";
import { DeleteCliente } from "./../controller/clientes/DeleteCliente.js";

const clienteRouter = Router();

const getAllCliente = new GetAllCliente();
clienteRouter.get('/clientes', getAllCliente.handle);

const getByIdCliente = new GetByIdCliente();
clienteRouter.get('/clientes/:id', getByIdCliente.handle);

const createCliente = new CreateCliente();
clienteRouter.post('/clientes', createCliente.handle);

const updateCliente = new UpdateCliente();
clienteRouter.put('/clientes', updateCliente.handle);

const deleteCliente = new DeleteCliente();
clienteRouter.delete('/clientes', deleteCliente.handle);

export { clienteRouter };

export default Router;
