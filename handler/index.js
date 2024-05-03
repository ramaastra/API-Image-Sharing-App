module.exports = {
  serverError: (err, req, res, next) => {
    res.status(err.code === 'INVALID_FILE_TYPE' ? 400 : 500).json({
      status: false,
      message: err.message,
      data: null
    });

    next(err);
  },
  clientError: (req, res, next) => {
    res.status(404).json({
      status: false,
      message: `${req.method} ${req.url} is not available`,
      data: null
    });
  }
};
