// AgendaController.js
import * as AgendaModel from '../models/AgendaModel.js';

export const getAgendaByKelurahan = async (req, res) => {
  try {
    const { kelurahan_id } = req.body;
    console.log('Received Agenda request - Request Body:', JSON.stringify(req.body));

    const data = await AgendaModel.getAgendaByKelurahan(kelurahan_id);

    res.json({
      message: 'GET Agenda success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};