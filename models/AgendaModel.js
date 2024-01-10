import { db } from '../config/Database.js';

export const getAgendaByKelurahan = async (kelurahan_id) => {
  const query = 'SELECT * FROM agenda WHERE kelurahan_id = ?';

  try {
    const [rows] = await db.query(query, [Number(kelurahan_id)]);
    return rows;
  } catch (error) {
    throw error;
  }
};