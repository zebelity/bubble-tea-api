function errorHandler(err, req, res ,next) {
  console.log(err)
  const {status = 500, message} = err
  res
    .status(status)
    .json({message, status})
}

module.exports = errorHandler