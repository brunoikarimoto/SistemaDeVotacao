import express from "express";

import EnqueteRouter from "./EnqueteRoutes.js";
import OpcoesRouter from "./OpcoesRoutes.js";

const router = express.Router();

router.use("/enquete", EnqueteRouter);
router.use("/opcoes", OpcoesRouter);

router.get("/", (req, res) => {
  res.send("API WORKING");
});

export default router;
