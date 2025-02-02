import { ConsultarNotaController, IController } from "../../Controller/ConsultarNotaController";
import { ConsultarNotaUseCase } from "../../domain/usecases/ConsultarNotaUseCase";


export function factoryController(): IController {
    const uc = new ConsultarNotaUseCase();
    const controller = new ConsultarNotaController(uc);
    return controller;
}