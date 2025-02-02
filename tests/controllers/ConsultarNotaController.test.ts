import { IUseCase } from "../../src/contracts/iusecase";
import { ConsultarNotaController } from "../../src/Controller/ConsultarNotaController";
import { IEntradaConsultarNotaUseCase, ISaidaConsultarNotaUseCase } from "../../src/domain/usecases/ConsultarNotaUseCase";
import { Request, Response } from "express";

class UseCaseFake implements IUseCase<IEntradaConsultarNotaUseCase, ISaidaConsultarNotaUseCase> {
    chamado: boolean = false;
    erro: boolean;
    constructor(erro: boolean){
        this.erro = erro;
    }
    async perform(entrada: IEntradaConsultarNotaUseCase): Promise<ISaidaConsultarNotaUseCase> {
        if(this.erro) {
            throw new Error('Erro ao consultar nota.');
        }
        this.chamado = true;
        return {
            nota: 10
        } as ISaidaConsultarNotaUseCase;
    }
}

class ResponseFake {
    statusCodeInformado: number = 0;
    jsonInformado: any = null;
    endChamado: boolean = false;

    status(code: number): ResponseFake {
        this.statusCodeInformado = code;
        return this;
    }

    json(data: any): ResponseFake {
        this.jsonInformado = data;
        return this;
    }

    end(): ResponseFake {
        this.endChamado = true;
        return this;
    }
}

function makeSUT(matricula: string, semestre: string, disciplina: string, erro: boolean) {
    const requestStub = {
        params: {
            matricula: matricula,
            semestre: semestre,
            disciplina: disciplina,
            evento: 'P1',
        },
    } as any as Request;
    const responseFake = new ResponseFake();
    const uc = new UseCaseFake(erro);
    const controller = new ConsultarNotaController(uc);
    return { uc, controller, requestStub, responseFake };
}

describe('ControllerBasico', () => {
    
    it('deve instanciar ConsultarNotaController', () => {
        let { uc, controller, requestStub, responseFake } = makeSUT('1','1','1',false);
        expect(controller).toBeDefined();
    });

    it('deve chamar handle com os valores certos', async () => {
        let { uc, controller, requestStub, responseFake } = makeSUT('1','1','1',false);
        await controller.handle(requestStub, responseFake as any as Response);
        console.log(responseFake)
        expect(responseFake.endChamado).toBe(true);
        expect(responseFake.statusCodeInformado).toBe(200);
        expect(responseFake.jsonInformado.mensagem).toBe('ConsultarNotaController.metodoBasico() chamado');
        expect(responseFake.jsonInformado.nota.nota).toBe(10);
        
    });

    it('deve chamar handle com os valores errados', async () => {
        let { uc, controller, requestStub, responseFake } = makeSUT('a','1','1',false);
        await controller.handle(requestStub, responseFake as any as Response);
        console.log(responseFake)
        expect(responseFake.endChamado).toBe(false);
        expect(responseFake.statusCodeInformado).toBe(400);
        expect(responseFake.jsonInformado.erro).toBe('Parâmetros inválidos. Matrícula, semestre e disciplina devem ser números.');
        
    });

    it('deve ocorrer um erro inesperado', async () => {
        let { uc, controller, requestStub, responseFake } = makeSUT('1','1','1',true);
        await controller.handle(requestStub, responseFake as any as Response);
        console.log(responseFake)
        expect(responseFake.endChamado).toBe(false);
        expect(responseFake.statusCodeInformado).toBe(500);
        expect(responseFake.jsonInformado.erro).toBe('Erro ao consultar nota.');
        
    });

});