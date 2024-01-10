import express from 'express';
import * as UserController from '../controllers/UserController.js';
import multer from 'multer';

const upload = multer();

const router = express.Router();

router.post('/api/users/create',  upload.none(), UserController.createUser);
router.get('/api/users', UserController.getAllUsers);
router.get('/api/users/:id', UserController.getUserById);
router.get('/api/users/kel_id/:kelurahan_id', UserController.getUserByKelurahan);
router.patch('/api/users/:id', upload.none(), UserController.updateUser);
router.delete('/api/users/:id', UserController.deleteUser);

export default router;