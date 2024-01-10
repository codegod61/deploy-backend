// UserController.js
import * as UserModel from '../models/UserModel.js';

export const createUser = async (req, res) => {
  const { body } = req;
  const {kelurahan_id, username, password, email, nomor, alamat, kota} = req.body;
  if(!(kelurahan_id && username && password && email && nomor && alamat && kota)){
    return res.status(400).json({
      message: "format data yang anda masukkan salah!",
      data: body
    });
  }

  try {
    await UserModel.createUser(body);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const data = await UserModel.getAllUsers();
    console.log(data);
    res.json({
      message: 'GET all Users success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log('Received Admin Kelurahan request - Request Body:', JSON.stringify(body));

  try {
    await UserModel.updateUser(body, id);

    res.json({
      message: "Update User Success",
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


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [data] = await UserModel.getUserById(id);
    console.log("menerima request by id",id)
    res.json({
      message: 'GET User By Id success',
      data: data[0],
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

export const getUserByKelurahan = async (req, res) => {
  try {
    const kelurahan_id = req.params.kelurahan_id;
    const data = await UserModel.getUserByKelurahan(kelurahan_id);

    res.json({
      message: 'GET User By Kelurahan success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserModel.deleteUser(id);

    res.json({
      message: 'Delete User success',
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