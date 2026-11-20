import { Equipamento } from '../model/Equipamento.js';
import { atualizar, buscarPorId, cadastrar, deletar, listar } from '../repository/equipamentoRepository.js';
export function validarId(id) {
    const valor = String(id);
    return /^[1-9]\d*$/.test(valor) && Number.isSafeInteger(Number(valor));
}

export async function cadastrarEquipamento(req, res) {
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ mensagem: 'Envie os dados do equipamento em formato JSON.' });
    }

    const equipamento = new Equipamento(req.body.descricao, req.body.status_Equipamento, req.body.capacidade);
    try {
        equipamento.validar();
    } catch (erro) {
        return res.status(400).json({ mensagem: erro.message });
    }

    try {
        const id = await cadastrar(equipamento);
        return res.status(201).json({ mensagem: 'Equipamento cadastrado com sucesso.', id_equipamento: id });
    } catch (erro) {
        console.error('Erro ao cadastrar equipamento:', erro);
        return res.status(500).json({ mensagem: 'Erro ao cadastrar equipamento.' });
    }
}

export async function listarEquipamentos(req, res) {
    try {
        const equipamentos = await listar();
        return res.status(200).json(equipamentos);
    } catch (erro) {
        console.error('Erro ao listar equipamentos:', erro);
        return res.status(500).json({ mensagem: 'Erro ao listar equipamentos.' });
    }
}

export async function buscarEquipamentoPorId(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }

    try {
        const equipamento = await buscarPorId(id);
        if (!equipamento) {
            return res.status(404).json({ mensagem: 'Equipamento não encontrado.' });
        }
        return res.status(200).json(equipamento);
    } catch (erro) {
        console.error('Erro ao buscar equipamento:', erro);
        return res.status(500).json({ mensagem: 'Erro ao buscar equipamento.' });
    }
}

export async function atualizarEquipamento(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }
    if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
        return res.status(400).json({ mensagem: 'Envie os campos do equipamento em formato JSON.' });
    }
    if (!['descricao', 'status_Equipamento', 'capacidade'].some((campo) => Object.prototype.hasOwnProperty.call(req.body, campo))) {
        return res.status(400).json({ mensagem: 'Envie pelo menos um campo para atualizar.' });
    }

    try {
        const equipamentoExistente = await buscarPorId(id);
        if (!equipamentoExistente) {
            return res.status(404).json({ mensagem: 'Equipamento não encontrado.' });
        }

        const equipamento = new Equipamento(
            req.body.descricao !== undefined ? req.body.descricao : equipamentoExistente.descricao,
            req.body.status_Equipamento !== undefined ? req.body.status_Equipamento : equipamentoExistente.status_Equipamento,
            req.body.capacidade !== undefined ? req.body.capacidade : equipamentoExistente.capacidade
        );
        try {
            equipamento.validar();
        } catch (erro) {
            return res.status(400).json({ mensagem: erro.message });
        }

        await atualizar(id, equipamento);
        return res.status(200).json({ mensagem: 'Equipamento atualizado com sucesso.' });
    } catch (erro) {
        console.error('Erro ao atualizar equipamento:', erro);
        return res.status(500).json({ mensagem: 'Erro ao atualizar equipamento.' });1
    }
}

export async function deletarEquipamento(req, res) {
    const id = req.params.id;
    if (!validarId(id)) {
        return res.status(400).json({ mensagem: 'O ID deve ser um número inteiro positivo.' });
    }

    try {
        const equipamento = await buscarPorId(id);
        if (!equipamento) {
            return res.status(404).json({ mensagem: 'Equipamento não encontrado.' });
        }

        const removidos = await deletar(id);
        if (!removidos) {
            return res.status(404).json({ mensagem: 'Equipamento não encontrado.' });
        }
        return res.status(200).json({ mensagem: 'Equipamento excluído com sucesso.' });
    } catch (erro) {
        console.error('Erro ao excluir equipamento:', erro);
        return res.status(500).json({ mensagem: 'Erro ao excluir equipamento.' });
    }
}
