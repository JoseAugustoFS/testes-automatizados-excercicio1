import { Request, Response } from 'express';
import { IUseCase } from '../contracts/iusecase';
import { IEntradaConsultarNotaUseCase, ISaidaConsultarNotaUseCase } from '../domain/usecases/ConsultarNotaUseCase';

export interface IController {
    handle(req: Request, resp: Response): Promise<void>;
}

export class ConsultaNotaController implements IController {
    private uc: IUseCase<IEntradaConsultarNotaUseCase, ISaidaConsultarNotaUseCase>;

    constructor(uc: IUseCase<IEntradaConsultarNotaUseCase, ISaidaConsultarNotaUseCase>) {
        console.log('ConsultaNotaController instanciado');
        this.uc = uc;
    }

    public async handle(req: Request, resp: Response): Promise<void> {
        const { matricula, semestre, disciplina, evento } = req.params;

        if (!this.validarParametros(matricula, semestre, disciplina)) {
            resp.status(400).json({ erro: 'Parâmetros inválidos. Matrícula, semestre e disciplina devem ser números.' });
            return;
        }

        const dto_usecase: IEntradaConsultarNotaUseCase = {
            matricula: parseInt(matricula as string),
            semestre: parseInt(semestre as string),
            disciplina: parseInt(disciplina as string),
            evento: evento
        };

        try {
            const resultado = await this.uc.perform(dto_usecase);
            resp.json({ nota: resultado }).end();
        } catch (error) {
            resp.status(500).json({ erro: 'Erro ao consultar nota.' });
        }
    }

    private validarParametros(matricula: string, semestre: string, disciplina: string): boolean {
        return [matricula, semestre, disciplina].every(param => !isNaN(Number(param)));
    }
}
