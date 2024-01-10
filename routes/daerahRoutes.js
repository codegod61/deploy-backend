import express from 'express';
import * as DaerahController from '../controllers/DaerahController.js';
import multer from 'multer';

const upload = multer();

const router = express.Router();


router.post('/kelurahan/create', DaerahController.createKelurahan);
router.delete('/kelurahan/delete/:id', DaerahController.deleteKelurahan);
router.get('/kelurahan/all', DaerahController.getAllKelurahan);
router.get('/provinsi/all', DaerahController.getAllProvinsi);
router.get('/kabupaten/:province_id',DaerahController.getKabupatenByIdProvinsi)
router.get('/kecamatan/:regency_id',DaerahController.getKecamatanByIdKabupaten)
router.get('/kelurahan/:district_id',DaerahController.getKelurahanByIdKecamatan)

export default router;