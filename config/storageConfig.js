import multer from "multer";

// Konfigurasi untuk fileKTP
const storageKTP = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/imagesktp');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'fileKTP-' + uniqueSuffix + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  },
});

// Konfigurasi untuk fileKK
const storageKK = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/imagesKk');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'fileKK-' + uniqueSuffix + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  },
});

const uploadKTP = multer({ storage: storageKTP }).single('fileKTP');
const uploadKK = multer({ storage: storageKK }).single('fileKK');

export { uploadKTP, uploadKK };