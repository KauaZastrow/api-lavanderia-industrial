import express from 'express';
import {
    atualizarEmbalagem,
    buscarEmbalagemPorId,
    cadastrarEmbalagem,
    deletarEmbalagem,
    listarEquipamentos
} from '../controller/embalagemController.js';

const router = express.Router();

router.post('/', cadastrarEmbalagem);
router.get('/', listarEquipamentos);
router.get('/:id', buscarEmbalagemPorId);
router.patch('/:id', atualizarEmbalagem);
router.delete('/:id', deletarEmbalagem);

export default router;