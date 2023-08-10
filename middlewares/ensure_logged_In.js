function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res
    .status(401)
    .json({ message: 'unauthorize' })
  }

  next()
}

module.exports = ensureLoggedIn