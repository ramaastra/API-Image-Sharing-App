const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MB_IN_BYTES = 1024 ^ 2;
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

    if (req.file.size > MAXIMUM_FILE_SIZE) {
      return res.status(400).json({
        status: false,
        message: `File size limit exceeds (${
          MAXIMUM_FILE_SIZE / MB_IN_BYTES
        }MB)`,
        data: null
      });
    }

    res.status(200).send('SUCCESS');
  }
};
