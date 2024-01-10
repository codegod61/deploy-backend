import { db } from "../config/Database.js";

export const getAllPengajuan = async () => {
  try {
    const [rows] = await db.query(`SELECT pengajuan_id, pengajuan.user_id, jenis_surat, DATE_FORMAT(tanggal_pengajuan, '%Y-%m-%d %H:%i:%s') AS formatted_tanggal, proses, username, agama, no_nik, status
    FROM pengajuan
    JOIN user ON pengajuan.user_id = user.user_id `
    );
    return rows;
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
    throw err;
  }
};

export const createPengajuan = async (body, fileKTPPath, fileKKPath) => {
 
  const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const proses = "Terkirim"

  const query = "INSERT INTO pengajuan (user_id,nama_lengkap,no_nik,agama,status,alamat, jenis_surat, tanggal_pengajuan, proses, file_ktp, file_kk) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
  const values = [body.user_id,body.namaLengkap,body.noNik,body.agama,body.status,body.alamat, body.jenisSurat, currentDateTime,proses, fileKTPPath, fileKKPath];

  try {
    const [result] = await db.execute(query, values);
    console.log('Pengajuan saved to database');
    return result;
  } catch (error) {
    console.error('Error saving pengajuan to database:', error);
    throw error;
  }
};


export const getPengajuanByUserId = async (user_id) => {
  try {
    const userId = user_id || null;
    const query = `SELECT pengajuan_id, pengajuan.user_id, jenis_surat, DATE_FORMAT(tanggal_pengajuan, '%Y-%m-%d %H:%i:%s') AS formatted_tanggal, proses, username, agama, no_nik, status
    FROM pengajuan
    JOIN user ON pengajuan.user_id = user.user_id WHERE user.kelurahan_id = ?`;
    const [rows] = await db.execute(query, [userId]);

    return rows;
  } catch (error) {
    throw error;
  }
};

export const getPengajuanByPengajuanId = async (user_id) => {
  try {
    const userId = user_id || null;
    const query = `SELECT pengajuan_id, pengajuan.user_id, jenis_surat, DATE_FORMAT(tanggal_pengajuan, '%Y-%m-%d %H:%i:%s') AS formatted_tanggal, proses, username, agama, no_nik, status
    FROM pengajuan
    JOIN user ON pengajuan.user_id = user.user_id WHERE pengajuan.pengajuan_id = ?`;
    const [rows] = await db.execute(query, [userId]);

    return rows;
  } catch (error) {
    throw error;
  }
};

export const updateProsesSuratPengantar = async (userId, newProses) => {
  try {
    const query = 'UPDATE pengajuan SET proses = ? WHERE pengajuan_id = ? AND jenis_surat = ?';
    const values = [newProses, userId, 'Surat Pengantar'];

    const [result] = await db.execute(query, values);

    return result;
  } catch (error) {
    throw error;
  }
};


export const updateProsesSuratKeluarga = async (userId, newProses) => {
  try {
    const query = 'UPDATE pengajuan SET proses = ? WHERE pengajuan_id = ? AND jenis_surat = ?';
    const values = [newProses, userId, 'Pembuatan Keluarga'];

    const [result] = await db.execute(query, values);

    return result;
  } catch (error) {
    throw error;
  }
};

export const updateProsesSuratTidakMampu = async (userId, newProses) => {
  try {
    const query = 'UPDATE pengajuan SET proses = ? WHERE pengajuan_id = ? AND jenis_surat = ?';
    const values = [newProses, userId, 'Keterangan Tidak Mampu'];

    const [result] = await db.execute(query, values);

    return result;
  } catch (error) {
    throw error;
  }
};

export const deletePengajuan = async (id) => {
  const query = 'DELETE FROM pengajuan WHERE pengajuan_id=?';
  return db.execute(query, [id]);
}

export const updateProses = async (body, id) => {
  const query = `UPDATE pengajuan SET proses = ? WHERE pengajuan_id = ?`;
  const values = [body.proses, id];

  return db.execute(query, values);
};


