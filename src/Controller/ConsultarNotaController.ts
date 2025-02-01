import { Request, Response } from 'express';
import { IUseCase } from '../contracts/iusecase';

export interface IController {
    handle(req: Request, resp: Response): Promise<void>;
}

export class ConsultaNotaController implements IController {
    private uc: IUseCase<any, any>;

    constructor(uc: IUseCase<any, any>) {
        console.log('ConsultaNotaController instanciado');
        this.uc = uc;
    }

    public async handle(req: Request, resp: Response): Promise<void> {
        const { matricula, semestre, disciplina, evento } = req.params;

        if (!this.validarParametros(matricula, semestre, evento)) {
            resp.status(400).json({ erro: 'Parâmetros inválidos. Matrícula, semestre e evento devem ser números.' });
            return;
        }

        try {
            const resultado = await this.uc.perform({ matricula, semestre, disciplina, evento });
            resp.json({ nota: resultado }).end();
        } catch (error) {
            resp.status(500).json({ erro: 'Erro ao consultar nota.' });
        }
    }

    private validarParametros(matricula: string, semestre: string, evento: string): boolean {
        return [matricula, semestre, evento].every(param => !isNaN(Number(param)));
    }
}
