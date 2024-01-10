import * as ArticleModel from '../models/ArticleModal.js';
import path from "path";
import fs from "fs";

const getArticles = async (req, res) => {
  try {
    const [data] = await ArticleModel.getArticles();

    res.json({
      message: 'GET all Article success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error,
    });
  }
};

const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const [data] = await ArticleModel.getArticleById(id)

    res.json({
      message: 'GET Article success',
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};


const saveArticle = async (req, res) => {
  try {
    const { body } = req;

    if (!req.files || !req.files.file) {
      return res.status(422).json({ msg: 'File tidak ditemukan' });
    }

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = `${Date.now()}_${file.md5}${ext}`;
    const url = `${req.protocol}://${req.get('host')}/imagesArticle/${fileName}`;
    const allowedTypes = ['.png', '.jpg', '.jpeg'];

    if (!allowedTypes.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: 'Format gambar tidak sesuai' });
    }

    if (fileSize > 5000000) {
      return res.status(422).json({ msg: 'Ukuran maksimal gambar hanya 5 MB' });
    }

    file.mv(`./public/imagesArticle/${fileName}`, async (err) => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }

      try {
        await ArticleModel.saveArticle(body, fileName, url);

        res.status(201).json({
          message: 'CREATE new article success',
          data: body,
        });
      } catch (error) {
        res.status(500).json({
          message: 'Server Error',
          serverMessage: error,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message || error,
    });
  }
};

const updateArticle = async (req, res) => {
  const { id } = req.params;

  async function getImageResult() {
    try {
      let imageResult = await ArticleModel.getImage(id);
      let getImage = imageResult[0][0].image;
      return getImage;
    } catch (error) {
      console.error("Error fetching image:", error);
      throw error;
    }
  }

  try {
    const article = await ArticleModel.getArticleById(id);

    if (!article) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const image1 = await getImageResult();

    let fileName = image1;

    if (req.files !== null) {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      fileName = file.md5 + ext;
      const allowedType = ['.png', '.jpg', '.jpeg'];

      if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Format image tidak sesuai" });
      }

      if (fileSize > 5000000) {
        return res.status(422).json({ msg: "Ukuran maksimal image hanya 5 MB" });
      }

      const filepath = `./public/imagesArticle/${image1}`;

      try {
        fs.unlinkSync(filepath);
      } catch (error) {
        console.error("Error deleting image:", error);
      }

      file.mv(`./public/imagesArticle/${fileName}`, (err) => {
        if (err) {
          return res.status(500).json({ msg: err.message });
        }
      });
    }

    const { body } = req;
    const url = `${req.protocol}://${req.get("host")}/imagesArticle/${fileName}`;

    await ArticleModel.updateArticle(body, fileName, url, id);

    res.json({
      message: 'UPDATE Article success',
      data: {
        id: id,
        ...body,
      },
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    });
  }
};


const deleteArticle = async (req, res) => {
  const { id } = req.params;

  try {
    const image1 = await getImageResult(id);
    const article = await ArticleModel.getArticleById(id);
    if (!article) {
      return res.status(404).json({ msg: "No Data Found" });
    }

    const filepath = `./public/imagesArticle/${image1}`;
    fs.unlinkSync(filepath);

    await ArticleModel.deleteArticle(id);

    res.json({
      message: 'DELETE Article success',
      data: null,
    });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({
      message: 'Server Error',
      serverMessage: error.message,
    });
  }
};

async function getImageResult(id) {
  try {
    const imageResult = await ArticleModel.getImage(id);
    const getImage = imageResult[0][0].image;
    return getImage;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
}
const getLatestArticles = async (req, res) => {
  try {
    const { size } = req.body;
    const latestArticles = await ArticleModel.getLatestArticles(size);
    res.json(latestArticles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getArticlesByPage = async (req, res) => {
  try {
    const { page, pageSize } = req.body;
    const articles = await ArticleModel.getArticlesByPage(page, pageSize);
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export {
  getArticles,
  getArticleById,
  saveArticle,
  updateArticle,
  deleteArticle,
  getLatestArticles,
  getArticlesByPage
};
