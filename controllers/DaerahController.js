import * as daerahModel from '../models/DaerahModel.js';

export const getAllProvinsi = async (req, res) => {
    try {
      const data = await daerahModel.getAllProvinsi();
  
      res.json(
        data
      );
    } catch (error) {
      res.status(500).json({
        message: 'Server Error',
        serverMessage: error.message || error,
      });
    }
  };

export const getKabupatenByIdProvinsi = async (req, res) => {
try {
    const { province_id } = req.params;
    const data = await daerahModel.getKabupatenByIdProvinsi(province_id);

    res.json(data);
} catch (error) {
    res.status(500).json({
    message: 'Server Error',
    serverMessage: error.message || error,
    });
}
};
export const getKecamatanByIdKabupaten = async (req, res) => {
    try {
        const { regency_id } = req.params;
        const data = await daerahModel.getKecamatanByIdKabupaten(regency_id);
    
        res.json(data);
    } catch (error) {
        res.status(500).json({
        message: 'Server Error',
        serverMessage: error.message || error,
        });
    }
    };

export const getKelurahanByIdKecamatan = async(req,res)=>{
    try {
      const { district_id } = req.params;
      const data = await daerahModel.getKelurahanByIdKecamatan(district_id);
      res.json(data);
    } catch (error) {
        res.status(500).json({
        message: 'Server Error',
        serverMessage: error.message || error,
        });
    }
};
export const createKelurahan = async(req,res)=>{
  try {
    const { district_id, name } = req.body;
    const data = await daerahModel.createKelurahan(district_id, name);
    res.json(data);
  } catch (error) {
      res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
      });
  }
}

export const getAllKelurahan = async (req, res) => {
  try {
    const data = await daerahModel.getAllKelurahan();

    res.json(
      data
    );
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

export const deleteKelurahan = async (req, res) => {
  try {
    const { id } = req.params;
    await daerahModel.deleteKelurahan(id);

    res.json({
      message: 'Delete Kelurahan success',
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