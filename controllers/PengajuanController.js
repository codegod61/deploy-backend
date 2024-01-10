import * as PengajuanModel from "../models/PengajuanModel.js";

export const getAllPengajuan = async (req, res) => {
  try {
    const data = await PengajuanModel.getAllPengajuan();
    
    res.json({
      message: "GET All Pengajuan success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message || error,
    });
  }
};

export const createPengajuan = async (req, res) => {
  try {
    const fileKTPPath = req.files.fileKTP[0].path;
    const fileKKPath = req.files.fileKK[0].path;
    console.log(req.body)

    await PengajuanModel.createPengajuan(req.body, fileKTPPath, fileKKPath);
    return res.status(200).json({ message: 'Pengajuan berhasil dibuat.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat membuat pengajuan.' });
  }
};

export const getPengajuanByPengajuanId = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await PengajuanModel.getPengajuanByPengajuanId(id);

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Data not found",
        data: null,
      });
    }

    res.json({
      message: "GET Pengajuan By User ID success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message || error,
    });
  }
};
export const getPengajuanByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await PengajuanModel.getPengajuanByUserId(user_id);

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "Data not found",
        data: null,
      });
    }

    res.json({
      message: "GET Pengajuan By User ID success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message || error,
    });
  }
};

export const updateProsesSuratPengantar = async (req, res) => {
  try {
    const pengajuan_id = req.params.pengajuan_id;
    const newProsesValue = req.body.proses; // Ambil nilai proses dari permintaan HTTP

    const result = await PengajuanModel.updateProsesSuratPengantar(
      pengajuan_id,
      newProsesValue
    );

    if (result.affectedRows > 0) {
      res.json({
        message: "Update Proses Surat Pengantar Success",
        data: result,
      });
    } else {
      res.status(404).json({
        message: "Data not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message || error,
    });
  }
};



export const updateProsesSuratKeluarga = async (req, res) => {
  try {
    const pengajuan_id = req.params.pengajuan_id;
    const newProsesValue = req.body.proses;

    const result = await PengajuanModel.updateProsesSuratKeluarga(
      pengajuan_id,
      newProsesValue
    );

    if (result.affectedRows > 0) {
      res.json({
        message: "Update Proses Surat Pembuatan Keluarga Success",
        data: result,
      });
    } else {
      res.status(404).json({
        message: "Data not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message || error,
    });
  }
};

export const updateProsesSuratTidakMampu = async (req, res) => {
  try {
    const pengajuan_id = req.params.pengajuan_id;
    const newProsesValue = req.body.proses;

    const result = await PengajuanModel.updateProsesSuratTidakMampu(
      pengajuan_id,
      newProsesValue
    );

    if (result.affectedRows > 0) {
      res.json({
        message: "Update Proses Surat Keterangan Tidak Mampu Success",
        data: result,
      });
    } else {
      res.status(404).json({
        message: "Data not found",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error.message || error,
    });
  }
};

export const deletePengajuan = async (req, res) => {
  try {
    const { id } = req.params;
    await PengajuanModel.deletePengajuan(id);

    res.json({
      message: 'Delete Pengajuan success',
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

export const updateProses = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log('Received Admin Kelurahan request - Request Body:', JSON.stringify(body));

  try {
    await PengajuanModel.updateProses(body, id);

    res.json({
      message: "Update Proses Success",
      data: {
        id: id,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};
