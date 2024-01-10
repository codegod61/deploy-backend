import express from 'express';
import multer from 'multer';
import * as PengajuanController from '../controllers/PengajuanController.js';
import { uploadKTP, uploadKK } from '../config/storageConfig.js';
//const upload = multer({ storage: storage });

const router = express.Router();

router.post('/api/pengajuan/create', (req, res) => {
  // Handle fileKTP upload
  uploadKTP(req, res, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Handle fileKK upload
    uploadKK(req, res, (err) => {
      if (err) {
        return res.status(500).send(err);
      }

      PengajuanController.createPengajuan(req, res);
    });
  });
});

router.get('/api/pengajuan', PengajuanController.getAllPengajuan);
router.get('/api/pengajuan/user/:user_id', PengajuanController.getPengajuanByUserId);
router.get('/api/pengajuan/:id', PengajuanController.getPengajuanByPengajuanId);
router.post('/api/pengajuan/create', PengajuanController.createPengajuan);
router.delete('/api/pengajuan/delete/:id', PengajuanController.deletePengajuan);
router.patch('/api/pengajuan/update/:id', PengajuanController.updateProses);

//router.patch('/api/pengajuan/pengantar/:pengajuan_id', upload.none(), PengajuanController.updateProsesSuratPengantar); 
// router.patch('/api/pengajuan/keluarga/:pengajuan_id', PengajuanController.updateProsesSuratKeluarga);
//router.patch('/api/pengajuan/keluarga/:pengajuan_id', upload.none(), PengajuanController.updateProsesSuratKeluarga); 
//router.patch('/api/pengajuan/keterangan/:pengajuan_id', upload.none(), PengajuanController.updateProsesSuratTidakMampu);
 

export default router;