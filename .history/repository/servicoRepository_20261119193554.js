import conexao from '../database/conexao.js';

export async function cadastrar(se) {
    const sql = 'INSERT INTO se (descricao, tipo_tecido, valor) VALUES (?, ?, ?)';
    const [resultado] = await conexao.execute(sql, [se.descricao, se.tipo_tecido, se.valor]);
    return resultado.insertId;
}


export async function listar() {
    const sql = 'SELECT * FROM se';
    const [resultado] = await conexao.execute(sql);
    return resultado;
}


export async function buscarPorId(id) {
    const sql = 'SELECT * FROM se WHERE id_se = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado[0];
}

export async function atualizar(id, se) {
    const sql = 'UPDATE se SET descricao = ?, tipo_tecido = ?, valor = ? WHERE id_se = ?';
    const [resultado] = await conexao.execute(sql, [se.descricao, se.tipo_tecido, se.valor, id]);
    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = 'DELETE FROM se WHERE id_se = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado.affectedRows;
}