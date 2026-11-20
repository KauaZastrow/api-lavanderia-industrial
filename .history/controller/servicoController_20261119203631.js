import { Servico } from '../model/Servico.js';
import { atualizar, buscarPorId, cadastrar, deletar, listar } from '../repository/servicoRepository.js';
export function validarId(id) {
    const valor = String(id);
    return /^[1-9]\d*$/.test(valor) && Number.isSafeInteger(Number(valor));
}

export async function cadastrarServico(req, res) {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ mensagem: 'Envie os dados do servico em formato JSON.' });
    }

    const servico = new Servico(req.body.nome, req.body.turno, req.body.matricula);
    try {
        servico.validar();
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }

    try {
        const id = await cadastrar(servico);
        return res.status(201).json({ mensagem: 'Servico cadastrado com sucesso.', id_servico: id });
    } catch (erro) {
        console.error('Erro ao cadastrar servico:', erro);
        return res.status(500).json({ mensagem: 'Erro ao cadastrar servico.' });
    }
}

export async function listarServicos(req, res) {
    try {
        const servicos = await listar();
        return res.status(200).json(servicos);
    } catch (erro) {
        console.error('Erro ao listar servicos:', erro);
        return res.status(500).json({ mensagem: 'Erro ao listar servicos.' });
    }
}

export async function buscarServicoPorId(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }

    try {
        const servico = await buscarPorId(id);
        if (!servico) {
            return res.status(404).json({ mensagem: 'Servico não encontrado.' });
        }
        return res.status(200).json(servico);
    } catch (erro) {
        console.error('Erro ao buscar servico:', erro);
        return res.status(500).json({ mensagem: 'Erro ao buscar servico.' });
    }
}

export async function atualizarServico(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ mensagem: 'Envie os campos do servico em formato JSON.' });
    }
    if (!['nome', 'turno', 'matricula'].some((campo) => Object.prototype.hasOwnProperty.call(req.body, campo))) {
        return res.status(400).json({ mensagem: 'Envie pelo menos um campo para atualizar.' });
    }

    try {
        const servicoExistente = await buscarPorId(id);
        if (!servicoExistente) {
            return res.status(404).json({ mensagem: 'Servico não encontrado.' });
        }

        const servico = new Servico(
            req.body.nome !== undefined ? req.body.nome : servicoExistente.nome,
            req.body.turno !== undefined ? req.body.turno : servicoExistente.turno,
            req.body.matricula !== undefined ? req.body.matricula : servicoExistente.matricula
        );
        try {
            servico.validar();
        } catch (erro) {
            return res.status(400).json({ mensagem: erro.message });
        }

        await atualizar(id, servico);
        return res.status(200).json({ mensagem: 'Servico atualizado com sucesso.' });
    } catch (erro) {
        console.error('Erro ao atualizar servico:', erro);
        return res.status(500).json({ mensagem: 'Erro ao atualizar servico.' });1
    }
}

export async function deletarServico(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }

    try {
        const servico = await buscarPorId(id);
        if (!servico) {
            return res.status(404).json({ mensagem: 'Servico não encontrado.' });
        }

        const removidos = await deletar(id);
        if (!removidos) {
            return res.status(404).json({ mensagem: 'Servico não encontrado.' });
        }
        return res.status(200).json({ mensagem: 'Servico excluído com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir servico:', erro);
        return res.status(500).json({ mensagem: 'Erro ao excluir servico.' });
    }
}
