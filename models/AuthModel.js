// AuthModel.js
import { db } from '../config/Database.js';

export const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM user WHERE email = ?';
  const [result] = await db.query(query, [email]);
  return result[0];
};
