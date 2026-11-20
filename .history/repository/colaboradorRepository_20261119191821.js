import conexao from '../database/conexao.js';

export async function cadastrar(embalagem) {
    const sql = 'INSERT INTO embalagem (descricao, material, capacidade) VALUES (?, ?, ?)';
    const [resultado] = await conexao.execute(sql, [embalagem.descricao, embalagem.material, embalagem.capacidade]);
    return resultado.insertId;
}


export async function listar() {
    const sql = 'SELECT * FROM embalagem';
    const [resultado] = await conexao.execute(sql);
    return resultado;
}
