import * as adminKelurahanModel from '../models/AdminKelurahanModel.js';

const getAdminKelurahanByKelurahan = async (req, res) => {
  try {
    const [data] = await adminKelurahanModel.getAdminKelurahanByKelurahan();

    res.json({
      message: 'GET All Admin Kelurahan success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

const getAdminKelurahanByKelurahanId = async (req, res) => {
  try {
    const { id } = req.params;
    const [data] = await adminKelurahanModel.getAdminKelurahanByKelurahanId(id);
    console.log(data);

    res.json({
      message: 'GET Admin Kelurahan success By Id',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

const createAdminKelurahanByKelurahan = async (req, res) => {
  const { body } = req;
  const {nama, password, pangkat, nomor, email, alamat} = req.body;
  console.log(req.body);

  if(!(nama && password && pangkat && nomor && email && alamat)){
    return res.status(400).json({
      message: "format data yang anda masukkan salah!",
      data: null
    });
  }
  
  try {
    await adminKelurahanModel.createAdminKelurahanByKelurahan(body);
    res.status(201).json({
      message: "Create Admin_Kelurahan Success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const updateAdminKelurahanByKelurahan = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    await adminKelurahanModel.updateAdminKelurahanByKelurahan(body, id);

    res.json({
      message: 'UPDATE Admin Kelurahan success',
      data: {
        id,
        ...body,
      },
    });
    console.log(body);
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

const deleteAdminKelurahanByKelurahan = (req, res) => {
  const { id } = req.params;

  try {
    adminKelurahanModel.deleteAdminKelurahanByKelurahan(id);

    res.json({
      message: 'DELETE Admin Kelurahan success',
      data: {
        id: id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }

}

export {
  getAdminKelurahanByKelurahanId,
  getAdminKelurahanByKelurahan,
  createAdminKelurahanByKelurahan,
  updateAdminKelurahanByKelurahan,
  deleteAdminKelurahanByKelurahan
}