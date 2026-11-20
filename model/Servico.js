export class Servico {
    constructor (descricao, tipo_tecido, valor){
        this.descricao = descricao;
        this.tipo_tecido = tipo_tecido;
        this.valor = valor;
    }

    validar(){
        if (typeof this.descricao !== "string" || this.descricao.trim().length < 3){
            throw new Error(`A descrição deve ter pelo menos 3 caracteres.`)
        }

        if (typeof this.tipo_tecido !== "string" || this.tipo_tecido.trim().length === 0){
            throw new Error(`O tipo de tecido é obrigatorio.`)
        }

        if (this.valor < 0 || this.valor === null || this.valor === undefined){
            throw new Error(`O valor deverá ser um número maior que zero.`)
        }
    }
}