const { PrismaClient } = require('@prisma/client');
const imagekit = require('../libs/imagekit');
const prisma = new PrismaClient();

const MB_IN_BYTES = 1024 ** 2;
const MAXIMUM_FILE_SIZE = 5 * MB_IN_BYTES;
const UPDATABLE_FIELDS = ['title', 'description'];

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
    const { file, body } = req;

    if (!file || !body || !body.title || !body.description) {
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

    const { url, fileId } = await imagekit.upload(buffer, originalname);

    const { title, description } = body;
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
  },
  update: async (req, res) => {
    if (!req.file && !req.body) {
      return res.status(400).json({
        status: false,
        message: `Required one of 'file', 'title', or 'description' field to update`,
        data: null
      });
    }

    const { id } = req.params;
    const image = await prisma.image.findFirst({ where: { id: parseInt(id) } });

    if (!image) {
      return res.status(400).json({
        status: false,
        message: 'Cannot find image with the corresponding id',
        data: null
      });
    }

    const updatedData = {};

    for (field of Object.keys(req.body)) {
      if (UPDATABLE_FIELDS.includes(field)) {
        updatedData[field] = req.body[field];
      }
    }

    if (req.file) {
      await imagekit.delete(image.fileId);

      const { buffer, originalname } = req.file;
      const { url, fileId } = await imagekit.upload(buffer, originalname);
      updatedData.url = url;
      updatedData.fileId = fileId;
    }

    const updatedImage = await prisma.image.update({
      where: {
        id: parseInt(id)
      },
      data: updatedData,
      select: {
        id: true,
        title: true,
        description: true,
        url: true
      }
    });

    res.status(200).json({
      status: true,
      message: 'Image updated',
      data: updatedImage
    });
  },
  deleteRecord: async (req, res) => {
    const { id } = req.params;
    const image = await prisma.image.findFirst({ where: { id: parseInt(id) } });

    if (!image) {
      return res.status(400).json({
        status: false,
        message: 'Cannot find image with the corresponding id',
        data: null
      });
    }

    await imagekit.delete(image.fileId);
    await prisma.image.delete({ where: { id: parseInt(id) } });

    return res.status(200).json({
      status: true,
      message: `Image with id ${id} deleted`,
      data: null
    });
  }
};
