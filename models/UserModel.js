// UserModel.js
import { db } from '../config/Database.js';

export const createUser = async (body) => {
  const query = 'INSERT INTO user (kelurahan_id, username, password, email, nomor, alamat, kota) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [body.kelurahan_id, body.username, body.password, body.email, body.nomor, body.alamat, body.kota];
  try {
    const result = await db.execute(query, values);
    return result;
  } catch (error) {
    console.error('Gagal menjalankan query createUser:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM user');
    return rows;
  } catch (err) {
    console.error('Terjadi kesalahan:', err);
    throw err;
  }
};

export const updateUser = async (body, id) => {
  const query = `UPDATE user SET kelurahan_id=?, username=?, password=?, email=?, nomor=?, alamat=?, kota=?, imageURL=? WHERE user_id=?`;
  const values = [
    body.kelurahan_id,
    body.username,
    body.password,
    body.email,
    body.nomor,
    body.alamat,
    body.kota,
    body.imageURL,
    id,
  ];

  return db.execute(query, values);
};

export const getUserById = async (id) => {
  const query = `SELECT * FROM user WHERE user_id=?`;
  return db.execute(query, [id]);
};

export const getUserByKelurahan = async (kel_id) => {
  try {
    const kelurahanId = kel_id || null;
    const query = `SELECT * FROM user WHERE kelurahan_id=?`;
    const [rows] = await db.execute(query, [kelurahanId]);
    return rows;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  const query = 'DELETE FROM user WHERE user_id=?';

  return db.execute(query, [id]);
}
