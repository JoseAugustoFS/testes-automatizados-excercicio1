import { Router } from "express";
import { factoryController } from "../Factories/Factory-Controller";

const router = Router();

const objeto = factoryController();

router.get('/vivo', (req, res) => {
  res.status(200).json({ message: 'Estou vivo!' });
});

router.get('/:matricula/:disciplina/:semestre/:evento', (req, res) => {
  objeto.handle(req, res);
});

export { router };