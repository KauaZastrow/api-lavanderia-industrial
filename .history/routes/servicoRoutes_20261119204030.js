import express from 'express';
import {
    atualizarServico,
    buscarServicoPorId,
    cadastrarServico,
    deletarServico,
    listarServicoss
} from '../controller/equipamentoController.js';

const router = express.Router();

router.post('/', cadastrarServico);
router.get('/', listarServicoss);
router.get('/:id', buscarServicoPorId);
router.patch('/:id', atualizarServico);
router.delete('/:id', deletarServico);

export default router;