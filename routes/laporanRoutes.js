import express from 'express';
import * as LaporanController from '../controllers/LaporanController.js'
import multer from 'multer';


const upload = multer();

const router = express.Router();

router.post('/api/laporan', upload.none(), LaporanController.createLaporan);
router.get('/api/laporan', LaporanController.getAllLaporan);
router.get('/api/Laporan/user/:user_id', LaporanController.getLaporanByUserId);
router.get('/api/laporan/ekonomi', LaporanController.getEkonomiLaporan);
router.get('/api/laporan/keamanan', LaporanController.getKeamananLaporan);
router.get('/api/laporan/lingkungan', LaporanController.getLingkunganLaporan);
router.get('/api/laporan/kesehatan', LaporanController.getKesehatanLaporan);


export default router;