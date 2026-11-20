import conexao from '../database/conexao.js';

export async function cadastrar(eqipa) {
    const sql = 'INSERT INTO eqipa (descricao, tipo_tecido, valor) VALUES (?, ?, ?)';
    const [resultado] = await conexao.execute(sql, [eqipa.descricao, eqipa.tipo_tecido, eqipa.valor]);
    return resultado.insertId;
}


export async function listar() {
    const sql = 'SELECT * FROM eqipa';
    const [resultado] = await conexao.execute(sql);
    return resultado;
}


export async function buscarPorId(id) {
    const sql = 'SELECT * FROM eqipa WHERE id_eqipa = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado[0];
}

export async function atualizar(id, eqipa) {
    const sql = 'UPDATE eqipa SET descricao = ?, tipo_tecido = ?, valor = ? WHERE id_eqipa = ?';
    const [resultado] = await conexao.execute(sql, [eqipa.descricao, eqipa.tipo_tecido, eqipa.valor, id]);
    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = 'DELETE FROM eqipa WHERE id_eqipa = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado.affectedRows;
}