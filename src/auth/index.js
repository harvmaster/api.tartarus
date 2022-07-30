const { expressjwt: jwt } = require('express-jwt')
const jwtVerify = require('jsonwebtoken')
const secret = require('../../config').jwt.secret
const Users = require('../models/users')

const auth = () => {
  return {
    optional: jwt({
      secret: secret,
      algorithms: ['HS256'],
      userProperty: 'payload',
      credentialsRequired: false,
      getToken: getUserId
    }),
    required: jwt({
      secret: secret,
      algorithms: ['HS256'],
      // userProperty: 'payload',
      getToken: getUserId
    })
  }
}

const getTokenFromHeader = (req, res) => {
  console.log(req.header.authorization)
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        req.user = getUserId(req, res)
        return req.headers.authorization.split(' ')[1];
  }

  return null;
}

const getUserId = (req, res) => {
  if (req.headers && req.headers.authorization) {
    const header = req.headers.authorization
    
    let decoded
    try {
      decoded = jwtVerify.verify(header.split(' ')[1], secret);
    } catch (err) {
      return res.status(401).send('unauthorized');
    }

    return decoded.id
  }

  return null
}

const getUser = async (req, res) => {
  const id = getUserId(req, res)
  const user = await Users.findById(id)
  return user
}

module.exports = { required: auth().required, optional: auth().optional, getUserId, getUser }