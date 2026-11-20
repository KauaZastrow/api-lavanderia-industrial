import conexao from '../database/conexao.js';

export async function cadastrar(colaborador) {
    const sql = 'INSERT INTO colaborador (descricao, tipo_tecido, valor) VALUES (?, ?, ?)';
    const [resultado] = await conexao.execute(sql, [colaborador.descricao, colaborador.tipo_tecido, colaborador.valor]);
    return resultado.insertId;
}


export async function listar() {
    const sql = 'SELECT * FROM colaborador';
    const [resultado] = await conexao.execute(sql);
    return resultado;
}


export async function buscarPorId(id) {
    const sql = 'SELECT * FROM colaborador WHERE id_colaborador = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado[0];
}

export async function atualizar(id, colaborador) {
    const sql = 'UPDATE colaborador SET descricao = ?, tipo_tecido = ?, valor = ? WHERE id_colaborador = ?';
    const [resultado] = await conexao.execute(sql, [colaborador.descricao, colaborador.tipo_tecido, colaborador.valor, id]);
    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = 'DELETE FROM colaborador WHERE id_colaborador = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado.affectedRows;
}