import express from "express";

import {
  novaEnquete,
  todasEnquetes,
  umaEnquete,
  deletaEnquete,
  atualizaEnquete,
} from "../controllers/EnqueteController.js";

const EnqueteRouter = express.Router();

EnqueteRouter.get("/find/:id", umaEnquete);
EnqueteRouter.get("/list", todasEnquetes);
EnqueteRouter.post("/add", novaEnquete);
EnqueteRouter.post("/update/:id", atualizaEnquete);
EnqueteRouter.delete("/delete/:id", deletaEnquete);

export default EnqueteRouter;
