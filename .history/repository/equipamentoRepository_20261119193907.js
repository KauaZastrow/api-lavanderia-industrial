import conexao from '../database/conexao.js';

export async function cadastrar(equipame) {
    const sql = 'INSERT INTO equipame (descricao, tipo_tecido, valor) VALUES (?, ?, ?)';
    const [resultado] = await conexao.execute(sql, [equipame.descricao, equipame.tipo_tecido, equipame.valor]);
    return resultado.insertId;
}


export async function listar() {
    const sql = 'SELECT * FROM equipame';
    const [resultado] = await conexao.execute(sql);
    return resultado;
}


export async function buscarPorId(id) {
    const sql = 'SELECT * FROM equipame WHERE id_equipame = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado[0];
}

export async function atualizar(id, equipame) {
    const sql = 'UPDATE equipame SET descricao = ?, tipo_tecido = ?, valor = ? WHERE id_equipame = ?';
    const [resultado] = await conexao.execute(sql, [equipame.descricao, equipame.tipo_tecido, equipame.valor, id]);
    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = 'DELETE FROM equipame WHERE id_equipame = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado.affectedRows;
}