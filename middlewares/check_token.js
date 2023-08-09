const jwt = require("jsonwebtoken");

function checkToken( req, res, next) {

  //look inside req header for jwt token and fallback to query string
  let token = req.get('Authorization') || req.query.token

  if (token) {
    token = token.replace("Bearer ", "")
    console.log(token)
    console.log(process.env.SECRET)
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.log(err)
      }

      req.user = err ? null : decoded
      console.log(req.user)
      return next()
    })

  } else {
    req.user = null
    next()
  }
}

module.exports = checkToken