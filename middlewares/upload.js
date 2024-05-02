const multer = require('multer');

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];

const upload = multer({
  fileFilter: (req, file, callback) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      const error = new Error(
        `Only accepts ${ALLOWED_MIME_TYPES.join(', ')} file mime type`
      );
      callback(error, false);
    }

    callback(null, true);
  }
});

module.exports = upload;
