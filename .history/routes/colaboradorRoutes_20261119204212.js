import express from 'express';
import {
    atualizarServico,
    buscarServicoPorId,
    cadastrarServico,
    deletarServico,
    listarColaboradores
} from '../controller/servicoController.js';

const router = express.Router();

router.post('/', cadastrarServico);
router.get('/', listarColaboradores);
router.get('/:id', buscarServicoPorId);
router.patch('/:id', atualizarServico);
router.delete('/:id', deletarServico);

export default router;