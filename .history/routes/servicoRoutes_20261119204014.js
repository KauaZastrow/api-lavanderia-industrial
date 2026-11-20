import express from 'express';
import {
    atualizarEquipamento,
    buscarEquipamentoPorId,
    cadastrarEquipamento,
    deletarEquipamento,
    listarServicoss
} from '../controller/equipamentoController.js';

const router = express.Router();

router.post('/', cadastrarEquipamento);
router.get('/', listarServicoss);
router.get('/:id', buscarEquipamentoPorId);
router.patch('/:id', atualizarEquipamento);
router.delete('/:id', deletarEquipamento);

export default router;