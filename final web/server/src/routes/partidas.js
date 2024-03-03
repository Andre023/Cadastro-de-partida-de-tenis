import { Router } from "express";
import { GetAllPartida } from "../controller/partidas/GetAllPartida.js";
import { GetByIdPartida } from "../controller/partidas/GetByIdPartida.js";
import { CreatePartida } from "../controller/partidas/CreatePartida.js";
import { UpdatePartida } from "../controller/partidas/UpdatePartida.js";
import { DeletePartida } from "../controller/partidas/DeletePartida.js";

const partidasRouter = Router();

const getAllPartida = new GetAllPartida();
partidasRouter.get('/partidas', getAllPartida.handle);

const getByIdPartida = new GetByIdPartida();
partidasRouter.get('/partidas/:id', getByIdPartida.handle);

const createPartida = new CreatePartida();
partidasRouter.post('/partidas', createPartida.handle);

const updatePartida = new UpdatePartida();
partidasRouter.put('/partidas', updatePartida.handle);

const deletePartida = new DeletePartida();
partidasRouter.delete('/partidas', deletePartida.handle);

export { partidasRouter };

export default Router;