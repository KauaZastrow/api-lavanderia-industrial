export class Colaborador {
    constructor (nome, turno, matricula){
        this.nome = nome;
        this.turno = turno;
        this.matricula = matricula;
    }

    validar(){
        if (typeof this.nome !== "string" || this.nome.trim().length < 3){
            throw new Error(`O nome deve ter pelo menos 3 caracteres.`)
        }

        if (typeof this.turno !== "string" || this.turno.trim().length === 0){
            throw new Error(`O turno é obrigatorio.`)
        }

        if (this.matricula < 0 || this.matricula === null || this.matricula === undefined){
            throw new Error(`A matricula é obrigatoria.`)
        }
    }
}