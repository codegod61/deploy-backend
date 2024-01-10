import { db } from '../config/Database.js';

export const getAllProvinsi = async () => {
  const query = 'SELECT * FROM provinsi ORDER BY name ASC';

  try {
    const [rows] = await db.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};

export const getKabupatenByIdProvinsi = async (provinsi_id) => {
    const query = 'SELECT * FROM kabupaten Where province_id = ? ORDER BY name ASC';
  
    try {
      const [rows] = await db.query(query,[provinsi_id]);
      return rows;
    } catch (error) {
      throw error;
    }
  };

export const getKecamatanByIdKabupaten = async (regency_id) => {
const query = 'SELECT * FROM kecamatan Where regency_id = ? ORDER BY name ASC';

try {
    const [rows] = await db.query(query,[regency_id]);
    return rows;
} catch (error) {
    throw error;
}
};
 
export const getKelurahanByIdKecamatan = async (district_id) => {
  const query = 'SELECT * FROM kelurahan Where district_id = ? ORDER BY name ASC';
  
  try {
      const [rows] = await db.query(query,[district_id]);
      return rows;
  } catch (error) {
      throw error;
  }
  };
export const createKelurahan = async (district_id,name) => {
  const query = 'INSERT INTO kelurahan (district_id, name) VALUES(?,?) ';
  
  try {
      const [rows] = await db.query(query,[district_id, name]);
      return rows;
  } catch (error) {
      throw error;
  }
  };

  export const getAllKelurahan = async () => {
    const query = 'SELECT * FROM kelurahan ORDER BY name ASC';
  
    try {
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  };

  export const deleteKelurahan = async (id) => {
    const SQLQuery = 'DELETE FROM kelurahan WHERE id=?';
  
    return db.execute(SQLQuery, [id]);
  };