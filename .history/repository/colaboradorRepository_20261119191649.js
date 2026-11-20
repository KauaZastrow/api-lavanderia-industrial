import conexao from '../database/conexao.js';

export async function cadastrar(embalagem) {
    const sql = 'INSERT INTO embalagem (descricao, material, capacidade) VALUES (?, ?, ?)';
