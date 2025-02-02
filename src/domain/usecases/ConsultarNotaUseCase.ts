import { IUseCase } from "../../contracts/iusecase";

export interface IEntradaConsultarNotaUseCase {
    matricula: number;
    semestre: number;
    disciplina: number;
    evento: string;
}

export interface ISaidaConsultarNotaUseCase {
    nota: number;
}

export class ConsultarNotaUseCase implements IUseCase<IEntradaConsultarNotaUseCase, ISaidaConsultarNotaUseCase> {
    constructor() {
        console.log('ConsultarNotaUseCase instanciado');
    }

    public async perform(entrada: IEntradaConsultarNotaUseCase): Promise<ISaidaConsultarNotaUseCase> {
        const { matricula, semestre, disciplina, evento } = entrada;

        console.log('ConsultarNotaUseCase.metodoBasico() chamado', evento);
        const nota_processada: number = 10;

        const saida: ISaidaConsultarNotaUseCase = {
            nota: nota_processada,
        };
        return saida;
    }
}