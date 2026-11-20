import { Colaborador } from '../model/Colaborador.js';
import { atualizar, buscarPorId, cadastrar, deletar, listar } from '../repository/colaboradorRepository.js';
export function validarId(id) {
    const valor = String(id);
    return /^[1-9]\d*$/.test(valor) && Number.isSafeInteger(Number(valor));
}

export async function cadastrarColaborador(req, res) {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ mensagem: 'Envie os dados do colaborador em formato JSON.' });
    }

    const colaborador = new Colaborador(req.body.nome, req.body.turno, req.body.matricula);
    try {
        colaborador.validar();
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }

    try {
        const id = await cadastrar(colaborador);
        return res.status(201).json({ mensagem: 'Colaborador cadastrado com sucesso.', id_colaborador: id });
    } catch (erro) {
        console.error('Erro ao cadastrar colaborador:', erro);
        return res.status(500).json({ mensagem: 'Erro ao cadastrar colaborador.' });
    }
}

export async function listarServicos(req, res) {
    try {
        const colaboradores = await listar();
        return res.status(200).json(colaboradores);
    } catch (erro) {
        console.error('Erro ao listar colaboradores:', erro);
        return res.status(500).json({ mensagem: 'Erro ao listar colaboradores.' });
    }
}

export async function buscarColaboradorPorId(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }

    try {
        const colaborador = await buscarPorId(id);
        if (!colaborador) {
            return res.status(404).json({ mensagem: 'Colaborador não encontrado.' });
        }
        return res.status(200).json(colaborador);
    } catch (erro) {
        console.error('Erro ao buscar colaborador:', erro);
        return res.status(500).json({ mensagem: 'Erro ao buscar colaborador.' });
    }
}

export async function atualizarColaborador(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ mensagem: 'Envie os campos do colaborador em formato JSON.' });
    }
    if (!['nome', 'turno', 'matricula'].some((campo) => Object.prototype.hasOwnProperty.call(req.body, campo))) {
        return res.status(400).json({ mensagem: 'Envie pelo menos um campo para atualizar.' });
    }

    try {
        const colaboradorExistente = await buscarPorId(id);
        if (!colaboradorExistente) {
            return res.status(404).json({ mensagem: 'Colaborador não encontrado.' });
        }

        const colaborador = new Colaborador(
            req.body.nome !== undefined ? req.body.nome : colaboradorExistente.nome,
            req.body.turno !== undefined ? req.body.turno : colaboradorExistente.turno,
            req.body.matricula !== undefined ? req.body.matricula : colaboradorExistente.matricula
        );
        try {
            colaborador.validar();
        } catch (erro) {
            return res.status(400).json({ mensagem: erro.message });
        }

        await atualizar(id, colaborador);
        return res.status(200).json({ mensagem: 'Colaborador atualizado com sucesso.' });
    } catch (erro) {
        console.error('Erro ao atualizar colaborador:', erro);
        return res.status(500).json({ mensagem: 'Erro ao atualizar colaborador.' });1
    }
}

export async function deletarColaborador(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }

    try {
        const colaborador = await buscarPorId(id);
        if (!colaborador) {
            return res.status(404).json({ mensagem: 'Colaborador não encontrado.' });
        }

        const removidos = await deletar(id);
        if (!removidos) {
            return res.status(404).json({ mensagem: 'Colaborador não encontrado.' });
        }
        return res.status(200).json({ mensagem: 'Colaborador excluído com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir colaborador:', erro);
        return res.status(500).json({ mensagem: 'Erro ao excluir colaborador.' });
    }
}
