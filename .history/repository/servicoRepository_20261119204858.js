import conexao from '../database/conexao.js';

export async function cadastrar(servico) {
    const sql = 'INSERT INTO servico_lavagem (descricao, tipo_tecido, valor) VALUES (?, ?, ?)';
    const [resultado] = await conexao.execute(sql, [servico.descricao, servico.tipo_tecido, servico.valor]);
    return resultado.insertId;
}


export async function listar() {
    const sql = 'SELECT * FROM servico_lavagem';
    const [resultado] = await conexao.execute(sql);
    return resultado;
}


export async function buscarPorId(id) {
    const sql = 'SELECT * FROM servico_lavagem WHERE id_servico = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado[0];
}

export async function atualizar(id, servico) {
    const sql = 'UPDATE servico_lavagem SET descricao = ?, tipo_tecido = ?, valor = ? WHERE id_servico = ?';
    const [resultado] = await conexao.execute(sql, [servico.descricao, servico.tipo_tecido, servico.valor, id]);
    return resultado.affectedRows;
}

export async function deletar(id) {
    const sql = 'DELETE FROM servico_lavagem WHERE id_servico = ?';
    const [resultado] = await conexao.execute(sql, [id]);
    return resultado.affectedRows;
}