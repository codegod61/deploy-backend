
import express from 'express';
import * as AgendaController from '../controllers/AgendaController.js';

const router = express.Router();

router.post('/kelurahan_id', AgendaController.getAgendaByKelurahan);

export default router;
