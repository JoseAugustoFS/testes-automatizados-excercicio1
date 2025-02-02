import express from "express";
import { router } from "./Infra/routes/router";

const app = express();

app.use(express.json());
app.use(router);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});