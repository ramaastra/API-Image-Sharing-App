const { PrismaClient } = require('@prisma/client');
const imagekit = require('../libs/imagekit');
const prisma = new PrismaClient();

const MB_IN_BYTES = 1024 ** 2;
const MAXIMUM_FILE_SIZE = 5 * MB_IN_BYTES;

module.exports = {
  getAll: async (req, res) => {
    const images = await prisma.image.findMany();
    res.status(200).json({
      status: true,
      message: `Fetched ${images.length} record(s)`,
      data: images
    });
  },
  create: async (req, res) => {
    const { file } = req;
    const { title, description } = req.body;

    if (!file || !title || !description) {
      return res.status(400).json({
        status: false,
        message: `Field 'file', 'title', and 'description' are required`,
        data: null
      });
    }

    const { size, buffer, originalname } = file;

    if (size > MAXIMUM_FILE_SIZE) {
      return res.status(400).json({
        status: false,
        message: `File size limit exceeds (${
          MAXIMUM_FILE_SIZE / MB_IN_BYTES
        }MB)`,
        data: null
      });
    }

    const { url, fileId } = await imagekit.upload({
      file: buffer.toString('base64'),
      fileName: Date.now() + '-' + originalname.replace(/ /g, '-'),
      folder: 'images-sharing-app/images/'
    });

    const createdImage = await prisma.image.create({
      data: { title, description, url, fileId },
      select: {
        id: true,
        title: true,
        description: true,
        url: true
      }
    });

    res.status(201).json({
      status: true,
      message: 'New image record created',
      data: createdImage
    });
  }
};
