export class Colaborador {
    constructor (nome, turno, patrimonio){
        this.nome = nome;
        this.turno = turno;
        this.patrimonio = patrimonio;
    }

    validar(){
        if (typeof this.nome !== "string" || this.nome.trim().length < 3){
            throw new Error(`O nome deve ter pelo menos 3 caracteres.`)
        }

        if (typeof this.turno !== "string" || this.turno.trim().length === 0){
            throw new Error(`O turno é obrigatorio.`)
        }

        if (this.patrimonio < 0 || this.patrimonio === null || this.patrimonio === undefined){
            throw new Error(` patrimonio é obrigatoria.`)
        }
    }
}