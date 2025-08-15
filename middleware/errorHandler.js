const errorHandler = (err, req, res) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: Object.values(err.errors).map((e) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid data format',
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};

module.exports = { errorHandler };
