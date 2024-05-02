const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

module.exports = {
  upload: async (buffer, originalname) => {
    const { url, fileId } = await imagekit.upload({
      file: buffer.toString('base64'),
      fileName: Date.now() + '-' + originalname.replace(/ /g, '-'),
      folder: 'images-sharing-app/images/'
    });

    return { url, fileId };
  },
  delete: async (fileId) => {
    await imagekit.deleteFile(fileId);
  }
};
