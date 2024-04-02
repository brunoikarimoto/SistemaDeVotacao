import express from "express";

import {
  novaOpcao,
  findOne,
  findByEnquete,
  update,
  updateVotos,
  deleteOne,
  deleteAllFromEnquete,
} from "../controllers/OpcoesController.js";

const OpcoesRouter = express.Router();

OpcoesRouter.get("/findByEnquete/:id", findByEnquete);
OpcoesRouter.get("/find/:id", findOne);
OpcoesRouter.post("/votos/:id", updateVotos);
OpcoesRouter.post("/update/:id", update);
OpcoesRouter.post("/add", novaOpcao);
OpcoesRouter.delete("/delete/:id", deleteOne);
OpcoesRouter.delete("/deleteAll/:id", deleteAllFromEnquete);

export default OpcoesRouter;
