import * as LaporanModel from "../models/LaporanModel.js";

export const createLaporan = async (req, res) => {
  const { body } = req;
  const { user_id, bukti_laporan, lokasi_laporan, jenis_laporan, deskripsi } =
    req.body;

  if (
    !(user_id && bukti_laporan && lokasi_laporan && jenis_laporan && deskripsi)
  ) {
    res.status(400).json({
      message: "Bad Request",
      serverMessage: "Data tidak lengkap",
    });
    console.log(req.body);
  }

  try {
    await LaporanModel.createLaporan(body);
    res.status(201).json({
      success: true,
      message: "Laporan created successfully",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      serverMessage: error.message || error,
    });
  }
};

export const getAllLaporan = async (req, res) => {
  try {
    const data = await LaporanModel.getAllLaporan();
    console.log(data);
    res.json({
      message: "GET all Users success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message || error,
    });
  }
};

export const getLaporanByUserId = async (req, res) => {
    try {
      const { user_id } = req.params;
      const data = await LaporanModel.getLaporanByUserId(user_id);
  
      if (!data || data.length === 0) {
        return res.status(404).json({
          message: "Data not found",
          data: null,
        });
      }
  
      res.json({
        message: "GET Laporan By User ID success",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Server Error",
        serverMessage: error.message || error,
      });
    }
  };

  export const getEkonomiLaporan = async (req, res) => {
    try {
      const data = await LaporanModel.getEkonomiLaporan();
      
      res.json({
        success: true,
        message: 'Data Ekonomi Laporan ditemukan',
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        serverMessage: error.message || error,
      });
    }
  };

  export const getKeamananLaporan = async (req, res) => {
    try {
      const data = await LaporanModel.getKeamananLaporan();
      
      res.json({
        success: true,
        message: 'Data Keamanan Laporan ditemukan',
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        serverMessage: error.message || error,
      });
    }
  };

  export const getLingkunganLaporan = async (req, res) => {
    try {
      const data = await LaporanModel.getLingkunganLaporan();
      
      res.json({
        success: true,
        message: 'Data Lingkungan Laporan ditemukan',
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        serverMessage: error.message || error,
      });
    }
  };

  export const getKesehatanLaporan = async (req, res) => {
    try {
      const data = await LaporanModel.getKesehatanLaporan();
      
      res.json({
        success: true,
        message: 'Data Kesehatan Laporan ditemukan',
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        serverMessage: error.message || error,
      });
    }
  };
  
  
