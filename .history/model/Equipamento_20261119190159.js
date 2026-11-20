export class Colaborador {
    constructor (nome, status, patrimonio){
        this.nome = nome;
        this.status = status;
        this.patrimonio = patrimonio;
    }

    validar(){
        if (typeof this.nome !== "string" || this.nome.trim().length < 3){
            throw new Error(`O nome deve ter pelo menos 3 caracteres.`)
        }

        if (typeof this.status !== "string" || this.status.trim().length === 0){
            throw new Error(`O status é obrigatorio.`)
        }

        if (this.patrimonio < 0 || this.patrimonio === null || this.patrimonio === undefined){
            throw new Error(`O patrimonio é obrigatoria.`)
        }
    }
}