export class Colaborador {
    constructor (nome, status_Equipamento, patrimonio){
        this.nome = nome;
        this.status_Equipamento = status_Equipamento;
        this.patrimonio = patrimonio;
    }

    validar(){
        if (typeof this.nome !== "string" || this.nome.trim().length < 3){
            throw new Error(`O nome deve ter pelo menos 3 caracteres.`)
        }

        if (typeof this.status_Equipamento !== "string" || this.status_Equipamento.trim().length === 0){
            throw new Error(`O status_Equipamento é obrigatorio.`)
        }

        if (this.patrimonio < 0 || this.patrimonio === null || this.patrimonio === undefined){
            throw new Error(`O patrimonio é obrigatoria.`)
        }
    }
}