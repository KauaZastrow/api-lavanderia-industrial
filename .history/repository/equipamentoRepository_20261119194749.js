import conexao from '../database/conexao.js';

export async function cadastrar(equipamento) {
    const sql = 'INSERT INTO equipamento (nome, tipo_tecido, valor) VALUES (?, ?, ?)';
    const [resultado] = await conexao.execute(sql, [equipamento.nome, equipamento.tipo_tecido, equipamento.valor]);
    return resultado.insertId;
}


export async function listar() {
    const sql = 'SELECT * FROM equipamento';
    const [resultado] = await conexao.execute(sql);
    return resultado;
}


export async function buscarPorId(id) {
    const sql = 'SELECT * FROM equipamento WHERE id_equipamento = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado[0];
}

export async function atualizar(id, equipamento) {
    const sql = 'UPDATE equipamento SET nome = ?, tipo_tecido = ?, valor = ? WHERE id_equipamento = ?';
    const [resultado] = await conexao.execute(sql, [equipamento.nome, equipamento.tipo_tecido, equipamento.valor, id]);
    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = 'DELETE FROM equipamento WHERE id_equipamento = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado.affectedRows;
}