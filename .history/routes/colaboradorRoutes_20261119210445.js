import express from 'express';
import {
    atualizarColaborador,
    buscarColaboradorPorId,
    cadastrarColaborador,
    deletarColaborador,
    listarColaboradores
} from '../controller/colaboradorController.js';

const router = express.Router();

router.post('/', cadastrarColaborador);
router.get('/', listarColaboradores);
router.get('/:id', buscarColaboradorPorId);
router.patch('/:id', atualizarColaborador);
router.delete('/:id', deletarColaborador);

export default router;