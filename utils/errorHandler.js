module.exports = (res, err) => {
  res.status(500).json({
      success: false,
      message: err.message ? error.message : err
  });
};