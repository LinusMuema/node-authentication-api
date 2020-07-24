const jwt = require('jsonwebtoken')
const tokenSecret = process.env.TOKEN_SECRET

exports.generateToken = (user) => jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})
