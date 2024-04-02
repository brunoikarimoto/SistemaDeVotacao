import dotenv from "dotenv/config";
import express from "express";
import cors from "cors";

import router from "./routes/Router.js";

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
