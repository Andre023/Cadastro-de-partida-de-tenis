import { Router } from "express";
import { GetAllQuadra } from "../controller/quadras/GetAllQuadra.js";
import { GetByIdQuadra } from "../controller/quadras/GetByIdQuadra.js";
import { CreateQuadra } from "../controller/quadras/CreateQuadra.js";
import { UpdateQuadra } from "../controller/quadras/UpdateQuadra.js";
import { DeleteQuadra } from "./../controller/quadras/DeleteQuadra.js";

const quadraRouter = Router();

const getAllQuadra = new GetAllQuadra();
quadraRouter.get('/quadras', getAllQuadra.handle);

const getByIdQuadra = new GetByIdQuadra();
quadraRouter.get('/quadras/:id', getByIdQuadra.handle);

const createQuadra = new CreateQuadra();
quadraRouter.post('/quadras', createQuadra.handle);

const updateQuadra = new UpdateQuadra();
quadraRouter.put('/quadras', updateQuadra.handle);

const deleteQuadra = new DeleteQuadra();
quadraRouter.delete('/quadras', deleteQuadra.handle);

export { quadraRouter };

export default Router;